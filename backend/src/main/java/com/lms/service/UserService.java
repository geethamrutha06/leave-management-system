package com.lms.service;
import com.lms.dto.*;
import com.lms.entity.User;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class UserService {
    @Autowired private UserRepository userRepo;
    public UserDTO getProfile(String email) { return toDTO(getUser(email)); }
    public UserDTO updateProfile(String email, UpdateProfileRequest r) {
        User u = getUser(email);
        if (r.getName()!=null)       u.setName(r.getName());
        if (r.getPhone()!=null)      u.setPhone(r.getPhone());
        if (r.getDepartment()!=null) u.setDepartment(r.getDepartment());
        if (r.getPosition()!=null)   u.setPosition(r.getPosition());
        return toDTO(userRepo.save(u));
    }
    public List<UserDTO> getAllEmployees() {
        return userRepo.findByRole(User.Role.EMPLOYEE).stream().map(this::toDTO).collect(Collectors.toList());
    }
    public List<UserDTO> searchEmployees(String q) {
        return userRepo.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrDepartmentContainingIgnoreCase(q,q,q)
                .stream().filter(u->u.getRole()==User.Role.EMPLOYEE).map(this::toDTO).collect(Collectors.toList());
    }
    public User getUser(String email) {
        return userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
    }
    public UserDTO toDTO(User u) {
        return UserDTO.builder().id(u.getId()).name(u.getName()).email(u.getEmail())
                .role(u.getRole().name()).department(u.getDepartment()).phone(u.getPhone())
                .position(u.getPosition()).leaveBalance(u.getLeaveBalance()).createdAt(u.getCreatedAt()).build();
    }
}
