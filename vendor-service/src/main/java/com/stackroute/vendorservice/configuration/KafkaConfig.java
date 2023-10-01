package com.stackroute.vendorservice.configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

//    @Bean
//    public NewTopic topic(){
//        return TopicBuilder.name("vendor-details-topic").build();
//    }
//    @KafkaListener(topics = "service-details-topic", groupId = "group-2")
//    public void recievedMessage(String value){
//        System.out.println(value);
//    }
}
