package com.stackroute.emailservice.configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

//    @KafkaListener(topics = "booking-details-topic",groupId = "group-1")
//    public void recievedMessage(String value){
//        System.out.println(value);
//    }
//    @Bean
//    public NewTopic topic(){
//        return TopicBuilder.name("service-details-topic").build();
//    }
}
