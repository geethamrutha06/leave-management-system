package com.lms.dto;
import lombok.*;
import java.time.LocalDate;
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class LeaveRequestDTO {
    private Long      id;
    private Long      userId;
    private String    userName;
    private String    userEmail;
    private String    department;
    private String    leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private int       numberOfDays;
    private String    reason;
    private String    status;
    private String    adminComment;
    private LocalDate appliedDate;
    private LocalDate reviewedDate;
}
