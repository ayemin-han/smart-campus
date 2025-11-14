package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Advisor;
import com.school.Smart.Campus.repository.AdvisorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/advisors")
@CrossOrigin(origins = "*")
public class AdvisorController {

    @Autowired
    private AdvisorRepository advisorRepository;

    // --------------------------
    // CREATE ADVISOR
    // --------------------------
    @PostMapping
    public ResponseEntity<?> createAdvisor(@RequestBody Advisor advisor) {
        Advisor savedAdvisor = advisorRepository.save(advisor);
        return ResponseEntity.ok(savedAdvisor);
    }

    // --------------------------
    // GET ALL ADVISORS
    // --------------------------
    @GetMapping
    public List<Advisor> getAllAdvisors() {
        return advisorRepository.findAll();
    }

    // --------------------------
    // GET ADVISOR BY ID
    // --------------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getAdvisorById(@PathVariable int id) {
        Optional<Advisor> advisor = advisorRepository.findById(id);
        if (advisor.isPresent()) {
            return ResponseEntity.ok(advisor.get());
        }
        return ResponseEntity.status(404).body("Advisor not found");
    }

    // --------------------------
    // UPDATE ADVISOR
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdvisor(
            @PathVariable int id,
            @RequestBody Advisor advisorDetails) {

        Optional<Advisor> optionalAdvisor = advisorRepository.findById(id);
        if (!optionalAdvisor.isPresent()) {
            return ResponseEntity.status(404).body("Advisor not found");
        }

        Advisor advisor = optionalAdvisor.get();
        advisor.setName(advisorDetails.getName());
        advisor.setEmail(advisorDetails.getEmail());
        advisor.setPhNo(advisorDetails.getPhNo());
        advisor.setDepartment(advisorDetails.getDepartment());
        advisor.setTitle(advisorDetails.getTitle());

        Advisor updatedAdvisor = advisorRepository.save(advisor);

        return ResponseEntity.ok(updatedAdvisor);
    }

    // --------------------------
    // DELETE ADVISOR
    // --------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdvisor(@PathVariable int id) {
        Optional<Advisor> advisor = advisorRepository.findById(id);

        if (!advisor.isPresent()) {
            return ResponseEntity.status(404).body("Advisor not found");
        }

        advisorRepository.deleteById(id);
        return ResponseEntity.ok("Advisor deleted successfully");
    }
}
