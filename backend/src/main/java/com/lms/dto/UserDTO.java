package com.lms.dto;
import lombok.*;
import java.time.LocalDateTime;
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class UserDTO {
    private Long          id;
    private String        name;
    private String        email;
    private String        role;
    private String        department;
    private String        phone;
    private String        position;
    private int           leaveBalance;
    private LocalDateTime createdAt;
}
