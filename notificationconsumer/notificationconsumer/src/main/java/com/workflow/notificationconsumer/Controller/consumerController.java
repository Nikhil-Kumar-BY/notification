package com.workflow.notificationconsumer.Controller;

import com.workflow.notificationconsumer.KafkaConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class consumerController {

@Autowired
private KafkaConsumer kafkaConsumer;
    private final Map<String, Flux<String>> activeConnections = new ConcurrentHashMap<>();

// @GetMapping(value = "/api/getmessages", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
// public Flux<ServerSentEvent<String>> handleSseConnection(@RequestBody String id) {
//     return kafkaConsumer.consume(id)
//             .map(data -> ServerSentEvent.builder(data).build())
//             .doOnError(Throwable::printStackTrace)
//             .concatWith(Flux.never());
// }

    @GetMapping(value = "/api/getmessages/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> handleSseConnection2(@PathVariable int id) {


        Flux<String> messageStream = kafkaConsumer.consume("" + id)

                .doOnError(Throwable::printStackTrace);

        activeConnections.put(""+id, messageStream);

        return messageStream

                .map(data -> ServerSentEvent.builder(data).build())
                .concatWith(Flux.never());
    }
    @GetMapping(value = "/api/unsub/{id}")
    public void handleUnsub(@PathVariable int id){
         kafkaConsumer.unsubscribe(id+"");
         activeConnections.remove(""+id);
    }


 }
