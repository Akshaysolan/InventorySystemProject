package com.InventorySystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.InventorySystem.DTO.LoginRequest;
import com.InventorySystem.DTO.RegisterRequest;
import com.InventorySystem.model.User;
import com.InventorySystem.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void register(RegisterRequest request) {
        if (userRepo.existsByUsername(request.username))
            throw new RuntimeException("Username already exists");

        if (userRepo.existsByEmail(request.email))
            throw new RuntimeException("Email already registered");

        User user = new User();
        user.setUsername(request.username);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setRole(request.role);

        userRepo.save(user);
    }

    public User getUserFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing Authorization header");
        }

        String jwt = token.substring(7); // Skip "Bearer "

        String username = jwtService.extractUsername(jwt);
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    
    public User login(LoginRequest request) {
        User user = userRepo.findByUsername(request.username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.password, user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return user;
    }
}
