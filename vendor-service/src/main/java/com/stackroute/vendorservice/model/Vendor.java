package com.stackroute.vendorservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Vendor")
public class Vendor {
    @Id
    private String userId;
    private String name;
    private String email;
    private String password;
    private String about;
    private String contactInfo;
    private String location;
    private LocalDateTime registeredAt;
    private String profileimagelink;

    private List<String> services;
}