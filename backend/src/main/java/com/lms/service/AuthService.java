package com.lms.service;
import com.lms.dto.*;
import com.lms.entity.User;
import com.lms.repository.UserRepository;
import com.lms.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
    @Autowired private UserRepository       userRepo;
    @Autowired private BCryptPasswordEncoder encoder;
    @Autowired private JwtUtil              jwtUtil;
    public AuthResponse register(RegisterRequest r) {
        if (userRepo.existsByEmail(r.getEmail())) throw new RuntimeException("Email already registered");
        User u = User.builder()
                .name(r.getName()).email(r.getEmail())
                .password(encoder.encode(r.getPassword()))
                .role(User.Role.EMPLOYEE)
                .department(r.getDepartment()!=null?r.getDepartment():"General")
                .phone(r.getPhone()!=null?r.getPhone():"")
                .position(r.getPosition()!=null?r.getPosition():"Employee")
                .leaveBalance(20).build();
        u = userRepo.save(u);
        return build(u, jwtUtil.generateToken(u.getEmail(), u.getRole().name()));
    }
    public AuthResponse login(LoginRequest r) {
        User u = userRepo.findByEmail(r.getEmail()).orElseThrow(()->new RuntimeException("Invalid email or password"));
        if (!encoder.matches(r.getPassword(), u.getPassword())) throw new RuntimeException("Invalid email or password");
        return build(u, jwtUtil.generateToken(u.getEmail(), u.getRole().name()));
    }
    private AuthResponse build(User u, String token) {
        return AuthResponse.builder().token(token).id(u.getId()).name(u.getName())
                .email(u.getEmail()).role(u.getRole().name()).department(u.getDepartment())
                .position(u.getPosition()).leaveBalance(u.getLeaveBalance()).build();
    }
}
