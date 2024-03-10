package com.trend.analyzer.controller;

import java.util.List;

import com.trend.analyzer.entity.Users;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.trend.analyzer.service.UsersService;
/**
 * Controller class is where all the user requests are handled and required/appropriate
 * responses are sent
 */
@RestController
@RequestMapping("/users/v1")
@RequiredArgsConstructor
@Validated
public class UsersController {

    private final UsersService usersService;

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/users/v1/
     * Purpose: Fetches all the employees in the employee table
     *
     * @return List of Users
     */
    @GetMapping("/")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok().body(usersService.getAllUsers());
    }

    /**
     * This method is called when a POST request is made
     * URL: localhost:8080/users/v1/
     * Purpose: Creates a new user in the database
     *
     * @param user The user details to be created
     * @return The created user with a '201 Created' status
     */
    @PostMapping("/")
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        Users createdUser = usersService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

}