package com.lms.repository;
import com.lms.entity.LeaveRequest;
import com.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUserOrderByCreatedAtDesc(User user);
    List<LeaveRequest> findByStatusOrderByCreatedAtDesc(LeaveRequest.Status status);
    List<LeaveRequest> findAllByOrderByCreatedAtDesc();
    long countByStatus(LeaveRequest.Status status);
}
