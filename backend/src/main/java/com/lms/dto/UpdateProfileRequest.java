package com.lms.dto;
import lombok.Data;
@Data
public class UpdateProfileRequest {
    private String name;
    private String phone;
    private String department;
    private String position;
}
