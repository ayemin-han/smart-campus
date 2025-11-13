package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Scholarship;
import com.school.Smart.Campus.model.Student;
import com.school.Smart.Campus.repository.ScholarshipRepository;
import com.school.Smart.Campus.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/scholarships")
@CrossOrigin(origins = "*") // Adjust or restrict in production
public class ScholarshipController {

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    @Autowired
    private StudentRepository studentRepository;

    // ===== GET all scholarships (optional for admin view) =====
    @GetMapping
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepository.findAll();
    }

    @GetMapping("/{id}")
public ResponseEntity<?> getScholarshipById(@PathVariable int id) {
    return scholarshipRepository.findById(id)
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Scholarship not found"));
}

    // ===== GET scholarship for a student =====
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getScholarshipForStudent(@PathVariable int studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);

        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }

        Student student = studentOpt.get();
        Scholarship scholarship = student.getScholarship();

        if (scholarship == null) {
            return ResponseEntity.ok(Map.of(
                "hasScholarship", false,
                "message", "Student does not have a scholarship"
            ));
        }

        return ResponseEntity.ok(Map.of(
            "hasScholarship", true,
            "scholarship", scholarship
        ));
    }

    // ===== Assign a scholarship to a student (admin use) =====
    @PostMapping("/assign/{studentId}/{scholarshipId}")
    public ResponseEntity<?> assignScholarshipToStudent(
            @PathVariable int studentId,
            @PathVariable int scholarshipId) {

        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Scholarship> scholarshipOpt = scholarshipRepository.findById(scholarshipId);

        if (studentOpt.isEmpty() || scholarshipOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student or scholarship not found");
        }

        Student student = studentOpt.get();
        Scholarship scholarship = scholarshipOpt.get();

        student.setScholarship(scholarship);
        studentRepository.save(student);

        return ResponseEntity.ok(Map.of(
            "message", "Scholarship assigned successfully",
            "student", student
        ));
    }

    // ===== Remove a scholarship from a student =====
    @PutMapping("/remove/{studentId}")
    public ResponseEntity<?> removeScholarship(@PathVariable int studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);

        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }

        Student student = studentOpt.get();
        student.setScholarship(null);
        studentRepository.save(student);

        return ResponseEntity.ok(Map.of("message", "Scholarship removed from student"));
    }
}
