package com.example.backend.service

import com.example.backend.entity.User
import com.example.backend.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    @Transactional
    fun register(username: String, password: String, email: String, name: String): User {
        if (userRepository.existsByUsername(username)) {
            throw IllegalArgumentException("Username already exists")
        }
        if (userRepository.existsByEmail(email)) {
            throw IllegalArgumentException("Email already exists")
        }

        val user = User(
            username = username,
            password = passwordEncoder.encode(password),
            email = email,
            name = name
        )
        return userRepository.save(user)
    }

    fun login(username: String, password: String): User {
        val user = findByUsername(username)
            ?: throw IllegalArgumentException("User not found")
        
        if (!validatePassword(user, password)) {
            throw IllegalArgumentException("Invalid password")
        }
        
        return user
    }

    fun findByUsername(username: String): User? {
        return userRepository.findByUsername(username)
    }

    fun validatePassword(user: User, password: String): Boolean {
        return passwordEncoder.matches(password, user.password)
    }
} 