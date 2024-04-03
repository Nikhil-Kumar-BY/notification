package com.workflow.notificationconsumer.Controller;

import com.workflow.notificationconsumer.KafkaConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class consumerController {

@Autowired
private KafkaConsumer kafkaConsumer;
    private final Map<String, Flux<String>> activeConnections = new ConcurrentHashMap<>();

 @GetMapping(value = "/api/getmessages", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
 public Flux<ServerSentEvent<String>> handleSseConnection() {
     return kafkaConsumer.consume("unique-subscriber-id")
             .map(data -> ServerSentEvent.builder(data).build())
             .doOnError(Throwable::printStackTrace)
             .concatWith(Flux.never());
 }

    @GetMapping(value = "/api/getmessages/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> handleSseConnection2(@PathVariable int id) {

//        int userId = id;
//
//        return kafkaConsumer.consume("ride")
//
//                .filter(record -> {System.out.println(record);
//                    System.out.println(record.contains("userid:"+id));
//                    return true;}) // Filter messages based on user ID
//                .map(data -> ServerSentEvent.builder(data).build())
//                .doOnError(Throwable::printStackTrace)
//                .concatWith(Flux.never());
        Flux<String> messageStream = kafkaConsumer.consume("topic-" + id)
                .doOnError(Throwable::printStackTrace);

        activeConnections.put(""+id, messageStream);

        return messageStream
                .map(data -> ServerSentEvent.builder(data).build())
                .concatWith(Flux.never());
    }


 }
