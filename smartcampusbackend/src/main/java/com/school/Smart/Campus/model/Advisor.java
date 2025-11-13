package com.school.Smart.Campus.model;


import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.HashSet;

import jakarta.persistence.*;

@Entity
@Table(name = "Advisor")
public class Advisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Advisor_ID")
    private int advisorId;

    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "Ph_no", length = 20)
    private String phNo;

    @Column(name = "Department", length = 100)
    private String department;

    @Column(name = "Title", length = 50)
    private String title;

  
    @OneToMany(mappedBy = "advisor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("student-advisor")
    private Set<Student> students = new HashSet<>();

    public Advisor() {}

    public Advisor(String name, String email, String phNo, String department, String title) {
        this.name = name;
        this.email = email;
        this.phNo = phNo;
        this.department = department;
        this.title = title;
    }

    // Getters and setters
    public int getAdvisorId() { return advisorId; }
    public void setAdvisorId(int advisorId) { this.advisorId = advisorId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhNo() { return phNo; }
    public void setPhNo(String phNo) { this.phNo = phNo; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}

