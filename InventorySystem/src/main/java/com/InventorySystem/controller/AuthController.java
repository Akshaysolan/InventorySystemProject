package com.InventorySystem.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.InventorySystem.DTO.LoginRequest;
import com.InventorySystem.DTO.RegisterRequest;
import com.InventorySystem.model.User;
import com.InventorySystem.service.JwtService;
import com.InventorySystem.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;
    
    
    @Autowired
    private JwtService jwtService;
    

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String token) {
        // You'll need to extract and validate the token here
        // This example assumes your service already has a method for that

        User user = userService.getUserFromToken(token); // Implement this in UserService
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return "Registration successful!";
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        User user = userService.login(request);
        String token = jwtService.generateToken(user.getUsername());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }

}
