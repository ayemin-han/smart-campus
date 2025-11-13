package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Student;
import com.school.Smart.Campus.model.Club;
import com.school.Smart.Campus.repository.StudentRepository;
import com.school.Smart.Campus.repository.ClubRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StudentClubController {

    private final StudentRepository studentRepo;
    private final ClubRepository clubRepo;

    public StudentClubController(StudentRepository studentRepo, ClubRepository clubRepo) {
        this.studentRepo = studentRepo;
        this.clubRepo = clubRepo;
    }

    // ✅ Get all student-club relationships
    @GetMapping("/student-clubs")
    public ResponseEntity<List<Map<String, Object>>> getAllStudentClubs() {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Student student : studentRepo.findAll()) {
            for (Club club : student.getClubs()) {
                Map<String, Object> map = new HashMap<>();
                map.put("studentId", student.getStudentId());
                map.put("clubId", club.getClubId());
                map.put("clubName", club.getName());
                result.add(map);
            }
        }
        return ResponseEntity.ok(result);
    }

    // ✅ Delete a student-club relationship
    @DeleteMapping("/student-clubs/{studentId}/{clubId}")
    public ResponseEntity<?> leaveClub(@PathVariable int studentId, @PathVariable int clubId) {
        Optional<Student> studentOpt = studentRepo.findById(studentId);
        Optional<Club> clubOpt = clubRepo.findById(clubId);

        if (studentOpt.isPresent() && clubOpt.isPresent()) {
            Student student = studentOpt.get();
            Club club = clubOpt.get();
            if (student.getClubs().remove(club)) {
                studentRepo.save(student);
                return ResponseEntity.ok("Student left club successfully!");
            } else {
                return ResponseEntity.badRequest().body("Student was not part of this club");
            }
        }
        return ResponseEntity.badRequest().body("Invalid student or club ID");
    }
}
