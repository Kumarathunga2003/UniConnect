package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.LoginRequest;
import com.uniconnect.backend.dto.RegisterRequest;
import com.uniconnect.backend.entity.User;
import com.uniconnect.backend.service.JwtService;
import com.uniconnect.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(
            @Valid @RequestBody RegisterRequest request) {

        try {
            userService.registerUser(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Map.of(
                            "message", "Registration successful"
                    ));

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message", exception.getMessage()
                    ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @Valid @RequestBody LoginRequest request) {

        try {
            User user = userService.loginUser(request);
            String token = jwtService.generateToken(user);

            Map<String, Object> response = Map.of(
                    "message", "Login successful",
                    "token", token,
                    "userId", user.getId(),
                    "fullName", user.getFullName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
            );

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message", exception.getMessage()
                    ));
        }
    }
}