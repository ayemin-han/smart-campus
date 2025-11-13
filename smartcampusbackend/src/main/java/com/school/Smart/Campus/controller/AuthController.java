package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.User;
import com.school.Smart.Campus.model.Admin;
import com.school.Smart.Campus.model.Student;
import com.school.Smart.Campus.repository.UserRepository;
import com.school.Smart.Campus.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body(new MessageResponse("Invalid username or password"));
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body(new MessageResponse("Invalid username or password"));
        }

        // ✅ Safe way to trigger student load
        Student student = null;
        if (!user.isAdmin()) {
            student = user.getStudent();
            if (student != null) {
                student.getStudentId(); // force load
            }
        }

        String token = "fake-jwt-token-" + user.getUserId();

        Integer adminId = null;
        if (user.isAdmin()) {
            Optional<Admin> adminOpt = adminRepository.findByUser(user);
            if (adminOpt.isPresent()) {
                adminId = adminOpt.get().getAdminId();
            }
        }

        return ResponseEntity.ok(new LoginResponse(token, user.isAdmin(), user, adminId));
    }

    // ✅ Make these classes static
    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {
        } // required no-arg constructor

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class LoginResponse {
        private String token;
        private boolean admin;
        private User user;
        private Integer adminId;

        public LoginResponse(String token, boolean admin, User user, Integer adminId) {
            this.token = token;
            this.admin = admin;
            this.user = user;
            this.adminId = adminId;
        }

        public String getToken() {
            return token;
        }

        public boolean isAdmin() {
            return admin;
        }

        public User getUser() {
            return user;
        }

        public Integer getAdminId() {
            return adminId;
        }
    }

    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
