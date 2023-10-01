package com.stackroute.emailservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    @Value("${email.username}")
    private String emailUsername;

    @Value("${email.password}")
    private String emailPassword;

    @Value("${email.host}")
    private String emailHost;

    @Value("${email.port}")
    private int emailPort;

    public boolean sendEmail(String subject, String message, String to) {
        boolean isEmailSent = false;

        // Step 1: Create session properties
        Properties properties = new Properties();
        properties.put("mail.smtp.host", emailHost);
        properties.put("mail.smtp.port", emailPort);
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        // Step 2: Get the session object
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailUsername, emailPassword);
            }
        });

        session.setDebug(true);

        // Step 3: Compose the email message
        MimeMessage mimeMessage = new MimeMessage(session);
        try {
            mimeMessage.setFrom(new InternetAddress(emailUsername));
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setSubject(subject);
            mimeMessage.setText(message);

            // Step 4: Send the email
            Transport.send(mimeMessage);
            isEmailSent = true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return isEmailSent;
    }
}
