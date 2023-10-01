package com.stackroute.authenticationservice.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Users")
public class User implements UserDetails {
    @Id
    private String userId;
    private String email;
    private String password;
    private LocalDateTime registeredAt;
    public enum UserRole{
        Client,Vendor
    }
    private String userRole;

    public User() {
        this.registeredAt = LocalDateTime.now();
        // TODO Auto-generated constructor stub
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
