package com.jobportal.controller;

import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // POST /api/auth/register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        if (isBlank(user.getName()) || isBlank(user.getEmail())
                || isBlank(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Name, email aur password zaroori hain");
        }
        if (user.getPassword().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password kam se kam 6 character ka hona chahiye");
        }
        if (!"EMPLOYER".equals(user.getRole())) {
            user.setRole("JOB_SEEKER");   // default role
        }
        String email = user.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Ye email pehle se registered hai");
        }

        user.setId(null);
        user.setEmail(email);
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // POST /api/auth/login   body: { "email": "...", "password": "..." }
    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> body) {
        String email = body.getOrDefault("email", "").trim().toLowerCase();
        String password = body.getOrDefault("password", "");

        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Email ya password galat hai"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Email ya password galat hai");
        }
        return user;
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }
}
