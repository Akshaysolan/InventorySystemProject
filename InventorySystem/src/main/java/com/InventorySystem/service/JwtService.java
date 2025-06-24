package com.InventorySystem.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    private final String SECRET_KEY = "P0J5vI4slL1NL05OQjF5cXZ5T3Rzcm10bVhQTWhHRms=";

    public String extractUsername(String token) {
        if (token == null || token.trim().isEmpty() || token.chars().filter(ch -> ch == '.').count() != 2) {
            throw new io.jsonwebtoken.MalformedJwtException("Invalid JWT format");
        }

        return Jwts.parser()
                   .setSigningKey(SECRET_KEY.getBytes())
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
    }


    public String generateToken(String username) {
        return Jwts.builder()
                   .setSubject(username)
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                   .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                   .compact();
    }
}
