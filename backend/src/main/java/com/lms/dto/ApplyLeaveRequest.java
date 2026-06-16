package com.lms.dto;
import lombok.Data;
import java.time.LocalDate;
@Data
public class ApplyLeaveRequest {
    private String    leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String    reason;
}
