package com.stackroute.authenticationservice.kafka;

import com.stackroute.authenticationservice.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private Logger logger = LoggerFactory.getLogger(KafkaService.class);

    public boolean updateData(String userId){
        this.kafkaTemplate.send(AppConstants.AUTHENTICATION_TOPIC_NAME_STRING,userId);
        this.logger.info("Userid Sent");
        return true;
    }
}
