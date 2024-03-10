package com.trend.analyzer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trend.analyzer.entity.Users;

/**
 * Repository is an interface that provides access to data in a database
 */

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    boolean existsByEmail(String email);
}
