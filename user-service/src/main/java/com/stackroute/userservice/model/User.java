package com.stackroute.userservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String phoneNumber;
    private String countryCode;
    private String gender;
    private String email;
    private String location;
    private String about;
    private byte profileImageLink;
    private String userId;

}