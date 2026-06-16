package com.lms.controller;
import com.lms.dto.*;
import com.lms.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/employee")
@CrossOrigin
public class EmployeeController {
    @Autowired private UserService  userService;
    @Autowired private LeaveService leaveService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        return ResponseEntity.ok(userService.getProfile(auth.getName()));
    }
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Authentication auth, @RequestBody UpdateProfileRequest r) {
        return ResponseEntity.ok(userService.updateProfile(auth.getName(), r));
    }
    @PostMapping("/leaves/apply")
    public ResponseEntity<?> applyLeave(Authentication auth, @RequestBody ApplyLeaveRequest r) {
        return ResponseEntity.ok(leaveService.apply(auth.getName(), r));
    }
    @GetMapping("/leaves")
    public ResponseEntity<?> myLeaves(Authentication auth) {
        return ResponseEntity.ok(leaveService.getMyLeaves(auth.getName()));
    }
    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication auth) {
        return ResponseEntity.ok(userService.getProfile(auth.getName()));
    }
}
