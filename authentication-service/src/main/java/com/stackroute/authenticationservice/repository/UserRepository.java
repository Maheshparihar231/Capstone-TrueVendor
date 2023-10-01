package com.stackroute.authenticationservice.repository;

import com.stackroute.authenticationservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,String> {
    public Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
