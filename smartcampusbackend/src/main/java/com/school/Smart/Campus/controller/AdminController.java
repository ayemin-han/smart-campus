package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Admin;
import com.school.Smart.Campus.model.User;
import com.school.Smart.Campus.repository.AdminRepository;
import com.school.Smart.Campus.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    // --------------------------
    // CREATE ADMIN
    // --------------------------
    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody Admin adminRequest) {

        // Check if User exists
        if (adminRequest.getUser() == null || adminRequest.getUser().getUserId() == 0) {
            return ResponseEntity.badRequest().body("User ID is required");
        }

        Optional<User> userOptional = userRepository.findById(adminRequest.getUser().getUserId());
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Link user to admin
        adminRequest.setUser(userOptional.get());

        // Ensure Admin_ID is same as User_ID
        adminRequest.setAdminId(userOptional.get().getUserId());

        Admin savedAdmin = adminRepository.save(adminRequest);

        return ResponseEntity.ok(savedAdmin);
    }

    // --------------------------
    // GET ALL ADMINS
    // --------------------------
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // --------------------------
    // GET ADMIN BY ID
    // --------------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable int id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        }
        return ResponseEntity.status(404).body("Admin not found");
    }

    // --------------------------
    // UPDATE ADMIN DETAILS
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable int id, @RequestBody Admin adminDetails) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);

        if (!optionalAdmin.isPresent()) {
            return ResponseEntity.status(404).body("Admin not found");
        }

        Admin admin = optionalAdmin.get();

        admin.setName(adminDetails.getName());
        admin.setEmail(adminDetails.getEmail());
        admin.setPhNo(adminDetails.getPhNo());
        admin.setDepartment(adminDetails.getDepartment());

        Admin updatedAdmin = adminRepository.save(admin);

        return ResponseEntity.ok(updatedAdmin);
    }

    // --------------------------
    // DELETE ADMIN
    // --------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable int id) {
        Optional<Admin> admin = adminRepository.findById(id);

        if (!admin.isPresent()) {
            return ResponseEntity.status(404).body("Admin not found");
        }

        adminRepository.deleteById(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }
}
