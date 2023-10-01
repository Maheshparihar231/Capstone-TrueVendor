package com.stackroute.userservice.service;

import com.stackroute.userservice.kafka.AppConstants;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @KafkaListener(topics = AppConstants.AUTHENTICATION_TOPIC_NAME_STRING,groupId = AppConstants.GROUP_ID_STRING)
    public void getUserFromKafka(String input){
        //System.out.println(input);

        String content = input.substring(input.indexOf("(") + 1, input.lastIndexOf(")"));

        String[] fields = content.split(", ");

        User newUser = new User();

        for (String field : fields) {
            String[] parts = field.split("=");
            String attributeName = parts[0].trim();
            String attributeValue = parts[1].trim();

            switch (attributeName) {
                case "userId":
                    newUser.setUserId(attributeValue);
                    //System.out.println(attributeValue);
                    break;
                case "email":
                    newUser.setEmail(attributeValue);
                    //System.out.println(attributeValue);
                    break;
            }
        }

        //System.out.println(newUser.toString());

        this.createUser(newUser);
    }

    public User createUser(User user) {return userRepository.save(user);
    }


    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserByUserId(String userId){return userRepository.findByUserId(userId);}

    public User updateUserByEmail(String email, User updatedUser) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            // Update fields as needed
            user.setName(updatedUser.getName());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setGender(updatedUser.getGender());
            user.setLocation(updatedUser.getLocation());
            user.setAbout(updatedUser.getAbout());
            user.setCountryCode(updatedUser.getCountryCode());
            user.setProfileImageLink(updatedUser.getProfileImageLink());
            return userRepository.save(user);
        }
        return null;
    }

    public User updateUserByUserId(String userId ,User updatedUser){
        Optional<User> existingUser = userRepository.findByUserId(userId);
        if (existingUser.isPresent()){
            User user = existingUser.get();
            user.setName(updatedUser.getName());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setGender(updatedUser.getGender());
            user.setLocation(updatedUser.getLocation());
            user.setAbout(updatedUser.getAbout());
            user.setCountryCode(updatedUser.getCountryCode());
            user.setProfileImageLink(updatedUser.getProfileImageLink());
            return userRepository.save(user);
        }
        return null;
    }



    public void deleteUserByEmail(String email) {
        userRepository.findByEmail(email).ifPresent(user -> userRepository.delete(user));
    }

    public void deleteUserByUserId(String userId) {
        userRepository.findByUserId(userId).ifPresent(user -> userRepository.delete(user));
    }

}
