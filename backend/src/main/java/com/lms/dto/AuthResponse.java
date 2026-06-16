package com.lms.dto;
import lombok.*;
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long   id;
    private String name;
    private String email;
    private String role;
    private String department;
    private String position;
    private int    leaveBalance;
}
