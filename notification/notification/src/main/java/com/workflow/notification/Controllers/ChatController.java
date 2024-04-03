package com.workflow.notification.Controllers;

import com.workflow.notification.Models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;



    @RestController
    public class ChatController {

        @Autowired
        private KafkaTemplate<String, Message> kafkaTemplate;

        @PostMapping(value = "/api/send", consumes = "application/json", produces = "application/json")
        public void sendMessage(@RequestBody Message message) {
            message.setTimestamp(LocalDateTime.now().toString());
            try {
                //Sending the message to kafka topic queue

                kafkaTemplate.send("ride",Integer.toString(message.getUserid()), message).get();
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException(e);
            }
        }

    }


