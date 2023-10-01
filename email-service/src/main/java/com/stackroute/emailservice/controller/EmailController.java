package com.stackroute.emailservice.controller;

import com.stackroute.emailservice.model.EmailRequest;
import com.stackroute.emailservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;
//    @Autowired
//    private KafkaTemplate<String,String> kafkaTemplate;

    @RequestMapping("/welcome")
    public String welcome() {
        //kafkaTemplate.send("service-details-topic","service-name");
        return "Hello, this is my welcome API";
    }

    @RequestMapping(value = "/sendemail", method = RequestMethod.POST)
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest request) {
        boolean isEmailSent = this.emailService.sendEmail(request.getSubject(), request.getMessage(), request.getTo());
        if (isEmailSent) {
            return ResponseEntity.ok("Email is sent successfully");
        } else {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Email not sent");
        }
    }
}
