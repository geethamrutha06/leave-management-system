package com.lms.service;
import com.lms.dto.*;
import com.lms.entity.LeaveRequest;
import com.lms.entity.LeaveRequest.Status;
import com.lms.entity.User;
import com.lms.repository.LeaveRequestRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class LeaveService {
    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private UserRepository         userRepo;
    @Autowired private UserService            userService;
    public LeaveRequestDTO apply(String email, ApplyLeaveRequest r) {
        User u = userService.getUser(email);
        if (r.getStartDate().isBefore(LocalDate.now()))          throw new RuntimeException("Start date cannot be past");
        if (r.getEndDate().isBefore(r.getStartDate()))           throw new RuntimeException("End date must be after start");
        long days = ChronoUnit.DAYS.between(r.getStartDate(), r.getEndDate()) + 1;
        if (u.getLeaveBalance() < days) throw new RuntimeException("Insufficient balance. Available: " + u.getLeaveBalance());
        LeaveRequest l = LeaveRequest.builder().user(u)
                .leaveType(LeaveRequest.LeaveType.valueOf(r.getLeaveType()))
                .startDate(r.getStartDate()).endDate(r.getEndDate())
                .numberOfDays((int)days).reason(r.getReason())
                .status(Status.PENDING).appliedDate(LocalDate.now()).build();
        return toDTO(leaveRepo.save(l));
    }
    public List<LeaveRequestDTO> getMyLeaves(String email) {
        return leaveRepo.findByUserOrderByCreatedAtDesc(userService.getUser(email))
                .stream().map(this::toDTO).collect(Collectors.toList());
    }
    public List<LeaveRequestDTO> getAll(String filter) {
        if (filter != null && !filter.isBlank())
            return leaveRepo.findByStatusOrderByCreatedAtDesc(Status.valueOf(filter.toUpperCase()))
                    .stream().map(this::toDTO).collect(Collectors.toList());
        return leaveRepo.findAllByOrderByCreatedAtDesc().stream().map(this::toDTO).collect(Collectors.toList());
    }
    public LeaveRequestDTO review(Long id, String adminEmail, ReviewLeaveRequest r) {
        LeaveRequest l = leaveRepo.findById(id).orElseThrow(()->new RuntimeException("Leave not found"));
        if (l.getStatus() != Status.PENDING) throw new RuntimeException("Already reviewed");
        Status s = Status.valueOf(r.getStatus().toUpperCase());
        l.setStatus(s); l.setAdminComment(r.getAdminComment()!=null?r.getAdminComment():"");
        l.setReviewedDate(LocalDate.now()); l.setReviewedBy(userService.getUser(adminEmail));
        if (s == Status.APPROVED) {
            User emp = l.getUser();
            emp.setLeaveBalance(emp.getLeaveBalance() - l.getNumberOfDays());
            userRepo.save(emp);
        }
        return toDTO(leaveRepo.save(l));
    }
    public DashboardStats stats() {
        return DashboardStats.builder()
                .totalEmployees(userRepo.countByRole(User.Role.EMPLOYEE))
                .totalLeaves(leaveRepo.count())
                .pendingLeaves(leaveRepo.countByStatus(Status.PENDING))
                .approvedLeaves(leaveRepo.countByStatus(Status.APPROVED))
                .rejectedLeaves(leaveRepo.countByStatus(Status.REJECTED)).build();
    }
    public LeaveRequestDTO toDTO(LeaveRequest l) {
        return LeaveRequestDTO.builder().id(l.getId()).userId(l.getUser().getId())
                .userName(l.getUser().getName()).userEmail(l.getUser().getEmail())
                .department(l.getUser().getDepartment()).leaveType(l.getLeaveType().name())
                .startDate(l.getStartDate()).endDate(l.getEndDate()).numberOfDays(l.getNumberOfDays())
                .reason(l.getReason()).status(l.getStatus().name()).adminComment(l.getAdminComment())
                .appliedDate(l.getAppliedDate()).reviewedDate(l.getReviewedDate()).build();
    }
}
