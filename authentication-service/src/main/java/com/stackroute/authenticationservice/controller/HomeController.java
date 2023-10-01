package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.entity.User;
import com.stackroute.authenticationservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public List<User> getUser(){
        System.out.println("User");
        return this.userService.getUsers();
    }

//    @GetMapping("/current-user")
//    public String getLoggedUser(Principal principal){
//        return principal.getName();
//    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getLoggedUser(Principal principal) {
        if (principal != null) {
            String username = principal.getName();
            return ResponseEntity.ok("{\"status\": \"success\", \"username\": \"" + username + "\"}");
        } else {
            // Handle the case when the user is not authenticate
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"status\": \"failure\"}");
        }
    }

    @GetMapping("/userdata")
    public ResponseEntity<?> getUser(Principal principal){
        if (principal != null) {
            Optional<User> user = userService.getUserByEmail(principal.getName());
            System.out.println(principal.getName());
            //String username = user.get().getUserId();
            return ResponseEntity.ok(user);
        } else {
            // Handle the case when the user is not authenticate
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"status\": \"failure\"}");
        }
    }
}
