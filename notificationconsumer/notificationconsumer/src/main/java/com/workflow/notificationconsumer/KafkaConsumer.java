package com.workflow.notificationconsumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Service
public class KafkaConsumer {

    private final ConcurrentMap<String, Sinks.Many<String>> sinkMap;
    private final ConcurrentMap<String, Queue<String>> offlineMessages;

    @Autowired
    public KafkaConsumer() {
        this.sinkMap = new ConcurrentHashMap<>();
        this.offlineMessages = new ConcurrentHashMap<>();
    }

    @KafkaListener(topics = "ride", groupId = "group-id")
    public void listen(String message) {
        String[] arr = message.split(":");
        String[] ID = arr[1].split(",");
        System.out.println(Arrays.toString(arr));
        System.out.println(ID[0]);

        Sinks.Many<String> sink = sinkMap.get(ID[0]);
        System.out.println("reaching listener");
        if (sink != null) {
            System.out.println("not null");
            sink.tryEmitNext(message);
        } else {
            // User is offline, store the message
            System.out.println("absent");
            offlineMessages.computeIfAbsent(ID[0], k -> new ConcurrentLinkedQueue<>()).offer(message);
        }
    }

    public Flux<String> consume(String subscriberId) {
//        System.out.println("inside");
//        Sinks.Many<String> sink = Sinks.many().unicast().onBackpressureBuffer();
//        sinkMap.put(subscriberId, sink);
//        // Check for offline messages and deliver if exists
//        deliverOfflineMessages(subscriberId, sink);
//        sinkMap.put(subscriberId, sink);
//        return sink.asFlux();
        Sinks.Many<String> sink = sinkMap.computeIfAbsent(subscriberId, k -> Sinks.many().unicast().onBackpressureBuffer());

        // Check for offline messages and deliver if exists
        deliverOfflineMessages(subscriberId, sink);

        return sink.asFlux().doOnSubscribe(subscription -> {
            // Log the subscription for debugging purposes
            System.out.println("New subscription for subscriber: " + subscriberId);
        });
    }



    public void unsubscribe(String subscriberId) {
        sinkMap.remove(subscriberId);
        System.out.println("unsubscribed "+subscriberId);

    }

    private void deliverOfflineMessages(String userId, Sinks.Many<String> sink) {
        Queue<String> messages = offlineMessages.remove(userId);
        if (messages != null) {
            while (!messages.isEmpty()) {
                sink.tryEmitNext(messages.poll());
               // sinkMap.put(userId,sink);
            }
        }
    }
}
