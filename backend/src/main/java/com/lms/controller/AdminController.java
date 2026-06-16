package com.lms.controller;
import com.lms.dto.*;
import com.lms.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
    @Autowired private UserService  userService;
    @Autowired private LeaveService leaveService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {
        return ResponseEntity.ok(leaveService.stats());
    }
    @GetMapping("/employees")
    public ResponseEntity<?> allEmployees() {
        return ResponseEntity.ok(userService.getAllEmployees());
    }
    @GetMapping("/employees/search")
    public ResponseEntity<?> search(@RequestParam String q) {
        return ResponseEntity.ok(userService.searchEmployees(q));
    }
    @GetMapping("/leaves")
    public ResponseEntity<?> allLeaves(@RequestParam(required=false) String status) {
        return ResponseEntity.ok(leaveService.getAll(status));
    }
    @PutMapping("/leaves/{id}/review")
    public ResponseEntity<?> review(Authentication auth, @PathVariable Long id, @RequestBody ReviewLeaveRequest r) {
        return ResponseEntity.ok(leaveService.review(id, auth.getName(), r));
    }
}
