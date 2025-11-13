package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Club;
import com.school.Smart.Campus.model.Student;
import com.school.Smart.Campus.repository.ClubRepository;
import com.school.Smart.Campus.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {

    @Autowired
    private ClubRepository clubRepository;

       @Autowired
    private StudentRepository studentRepository;

    // Get clubs joined by a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Club>> getClubsByStudent(@PathVariable int studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isPresent()) {
            List<Club> clubs = student.get().getClubs().stream().toList();
            return ResponseEntity.ok(clubs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Get all clubs
    @GetMapping
    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    // Get club by ID
    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable int id) {
        Optional<Club> club = clubRepository.findById(id);
        return club.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new club
    @PostMapping
    public Club createClub(@RequestBody Club club) {
        return clubRepository.save(club);
    }

    // Update an existing club
    @PutMapping("/{id}")
    public ResponseEntity<Club> updateClub(@PathVariable int id, @RequestBody Club clubDetails) {
        Optional<Club> optionalClub = clubRepository.findById(id);

        if (!optionalClub.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Club club = optionalClub.get();
        club.setName(clubDetails.getName());
        club.setMembers(clubDetails.getMembers());
        club.setCategory(clubDetails.getCategory());
        club.setMeeting(clubDetails.getMeeting());
        club.setStatus(clubDetails.getStatus());

        Club updatedClub = clubRepository.save(club);
        return ResponseEntity.ok(updatedClub);
    }

    // Delete a club
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable int id) {
        Optional<Club> optionalClub = clubRepository.findById(id);
        if (!optionalClub.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        clubRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
