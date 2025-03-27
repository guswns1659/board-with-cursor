package com.example.backend.controller

import com.example.backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

data class RegisterRequest(
    val username: String,
    val password: String,
    val name: String,
    val email: String
)

data class LoginRequest(
    val username: String,
    val password: String
)

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {
    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<Any> {
        return try {
            val user = userService.register(
                username = request.username,
                password = request.password,
                name = request.name,
                email = request.email
            )
            ResponseEntity.ok(user)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(mapOf("error" to e.message))
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Any> {
        return try {
            val user = userService.login(
                username = request.username,
                password = request.password
            )
            ResponseEntity.ok(user)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(mapOf("error" to e.message))
        }
    }
} 