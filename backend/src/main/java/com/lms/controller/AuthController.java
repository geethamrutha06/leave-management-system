package com.lms.controller;
import com.lms.dto.*;
import com.lms.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired private AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest r) {
        return ResponseEntity.ok(authService.register(r));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest r) {
        return ResponseEntity.ok(authService.login(r));
    }
}
