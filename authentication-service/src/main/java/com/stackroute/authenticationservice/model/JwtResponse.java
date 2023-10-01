package com.stackroute.authenticationservice.model;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String jwtToken;
    private String username;
}
