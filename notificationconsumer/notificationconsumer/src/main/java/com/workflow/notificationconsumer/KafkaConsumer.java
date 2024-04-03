package com.workflow.notificationconsumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class KafkaConsumer {

    private final ConcurrentMap<String, Sinks.Many<String>> sinkMap;

    @Autowired
    public KafkaConsumer() {
        this.sinkMap = new ConcurrentHashMap<>();
    }

    @KafkaListener(topics = "ride", groupId = "group-id")
    public void listen(String message) {
        sinkMap.values().forEach(sink -> sink.tryEmitNext(message));
    }

    public Flux<String> consume(String subscriberId) {
        Sinks.Many<String> sink = Sinks.many().unicast().onBackpressureBuffer();
        sinkMap.put(subscriberId, sink);
        return sink.asFlux();
    }

    public void unsubscribe(String subscriberId) {
        sinkMap.remove(subscriberId);
    }
}