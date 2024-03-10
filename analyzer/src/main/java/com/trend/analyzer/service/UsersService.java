package com.trend.analyzer.service;
import com.trend.analyzer.entity.Users;
import com.trend.analyzer.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * The Service layer is where all the business logic lies
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UsersService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UsersRepository usersRepository;

    public List<Users> getAllUsers(){
        return usersRepository.findAll();
    }

    public Users createUser(Users user) {

        if (user == null) {
            throw new IllegalArgumentException("User object cannot be null.");
        }

        if (usersRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("A user with this email already exists.");
        }

        String encodedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(encodedPassword);

        user.setLocalDateTime();

        return usersRepository.save(user);

    }
}