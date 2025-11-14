package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Admin;
import com.school.Smart.Campus.model.User;
import com.school.Smart.Campus.repository.AdminRepository;
import com.school.Smart.Campus.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    if (adminRequest.getUser() == null || adminRequest.getUser().getUserId() == 0) {
        return ResponseEntity.badRequest().body("User ID is required.");
    }

    User existingUser = userRepository.findById(adminRequest.getUser().getUserId())
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + adminRequest.getUser().getUserId()));

    Admin admin = new Admin();
    admin.setUser(existingUser);
    admin.setName(adminRequest.getName());
    admin.setEmail(adminRequest.getEmail());
    admin.setPhNo(adminRequest.getPhNo());
    admin.setDepartment(adminRequest.getDepartment());

    Admin savedAdmin = adminRepository.save(admin);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
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

    // ❌ Do NOT allow updating user or adminId
    if (adminDetails.getUser() != null && adminDetails.getUser().getUserId() != admin.getAdminId()) {
        return ResponseEntity.badRequest().body("User ID cannot be changed for an Admin.");
    }

    // ✅ Update only provided fields (ignore nulls)
    if (adminDetails.getName() != null) {
        admin.setName(adminDetails.getName());
    }
    if (adminDetails.getEmail() != null) {
        admin.setEmail(adminDetails.getEmail());
    }
    if (adminDetails.getPhNo() != null) {
        admin.setPhNo(adminDetails.getPhNo());
    }
    if (adminDetails.getDepartment() != null) {
        admin.setDepartment(adminDetails.getDepartment());
    }

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
