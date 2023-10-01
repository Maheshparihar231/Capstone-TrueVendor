package com.stackroute.authenticationservice.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
@Configuration
public class KafkaConfig {
    @Bean
    public NewTopic topic(){
        return TopicBuilder
                .name(AppConstants.AUTHENTICATION_TOPIC_NAME_STRING)
                .build();
    }
}
