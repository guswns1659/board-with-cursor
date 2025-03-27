package com.example.backend.controller

import com.example.backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userService: UserService
) {
    data class RegisterRequest(
        val username: String,
        val password: String,
        val email: String,
        val name: String
    )

    data class LoginRequest(
        val username: String,
        val password: String
    )

    data class AuthResponse(
        val token: String,
        val user: UserResponse
    )

    data class UserResponse(
        val id: Long,
        val username: String,
        val email: String,
        val name: String
    )

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<AuthResponse> {
        val user = userService.register(
            username = request.username,
            password = request.password,
            email = request.email,
            name = request.name
        )

        val token = generateToken(user.username)
        return ResponseEntity.ok(AuthResponse(
            token = token,
            user = UserResponse(
                id = user.id,
                username = user.username,
                email = user.email,
                name = user.name
            )
        ))
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        val user = userService.findByUsername(request.username)
            ?: return ResponseEntity.badRequest().build()

        if (!userService.validatePassword(user, request.password)) {
            return ResponseEntity.badRequest().build()
        }

        val token = generateToken(user.username)
        return ResponseEntity.ok(AuthResponse(
            token = token,
            user = UserResponse(
                id = user.id,
                username = user.username,
                email = user.email,
                name = user.name
            )
        ))
    }

    private fun generateToken(username: String): String {
        // 실제 프로덕션에서는 JWT 등을 사용하여 토큰을 생성해야 합니다.
        return "dummy-token-$username"
    }
} 