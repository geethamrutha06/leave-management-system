package com.lms.dto;
import lombok.*;
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class DashboardStats {
    private long totalEmployees;
    private long totalLeaves;
    private long pendingLeaves;
    private long approvedLeaves;
    private long rejectedLeaves;
}
