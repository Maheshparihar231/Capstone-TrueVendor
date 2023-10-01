package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.kafka.KafkaService;
import com.stackroute.authenticationservice.model.JwtRequest;
import com.stackroute.authenticationservice.model.JwtResponse;
import com.stackroute.authenticationservice.security.JWTHelper;
import com.stackroute.authenticationservice.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.stackroute.authenticationservice.entity.User;

import java.security.Principal;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JWTHelper helper;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private KafkaService kafkaService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getEmail(), request.getPassword());

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response =new JwtResponse(token, userDetails.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

//    @PostMapping("/signup")
//    public User createUser(@RequestBody User user) {
//        return userService.createUser(user);
//    }

    @PostMapping("/signup")
    public ResponseEntity<?> addUser(@RequestBody User u)
    {
        if (userService.isUserExists(u.getEmail())) {
            return new ResponseEntity<>("User Already Exists",HttpStatus.CONFLICT);
        }
        User u1= this.userService.createUser(u);
        //System.out.println(u1);
        this.kafkaService.updateData(u1.toString());
        return new ResponseEntity<>(u1, HttpStatus.CREATED);
    }

}
