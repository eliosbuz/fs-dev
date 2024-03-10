package com.trend.analyzer.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * An entity class represents a table in a relational database
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "users")

public class Users {

    @Id
    private Integer id;
    private String username;
    private String email;
    private String password_hash;
    private LocalDateTime created_at;

    public String getPasswordHash() {
         return password_hash;
    };

    public void setPasswordHash(String password_hash) {
        this.password_hash = password_hash;
    };

    public void setLocalDateTime() {
        this.created_at = LocalDateTime.now();;
    };

}