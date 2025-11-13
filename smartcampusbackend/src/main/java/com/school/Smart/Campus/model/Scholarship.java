package com.school.Smart.Campus.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Scholarship")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Scholarship_ID")
    private int scholarshipId;

    @Column(name = "Title", length = 100)
    private String title;

    @Column(name = "Amount", precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "Type", length = 50)
    private String type;

    @Column(name = "Duration", length = 50)
    private String duration;

    @Column(name = "Requirement", columnDefinition = "TEXT")
    private String requirement;

   @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("student-scholarship")
    private Set<Student> students = new HashSet<>();


    // Constructors
    public Scholarship() {
    }

    public Scholarship(int scholarshipId, String title, BigDecimal amount, String type, String duration, String requirement) {
        this.scholarshipId = scholarshipId;
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.duration = duration;
        this.requirement = requirement;
    }

    // Getters and Setters
    public int getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(int scholarshipId) {
        this.scholarshipId = scholarshipId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}

