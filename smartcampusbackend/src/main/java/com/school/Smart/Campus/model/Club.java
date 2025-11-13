package com.school.Smart.Campus.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Clubs")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Club_ID")
    private int clubId;

    @Column(name = "Name", length = 100)
    private String name;

    @Column(name = "Members")
    private int members;

    @Column(name = "Category", length = 50)
    private String category;

    @Column(name = "Meeting", length = 50)
    private String meeting;

    @Column(name = "Status", length = 50)
    private String status;

    @ManyToMany(mappedBy = "clubs")
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    // ===== Constructors =====
    public Club() {}

    public Club(int clubId, String name, int members, String category, String meeting, String status) {
        this.clubId = clubId;
        this.name = name;
        this.members = members;
        this.category = category;
        this.meeting = meeting;
        this.status = status;
    }

    // ===== Getters and Setters =====
    public int getClubId() {
        return clubId;
    }

    public void setClubId(int clubId) {
        this.clubId = clubId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMembers() {
        return members;
    }

    public void setMembers(int members) {
        this.members = members;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMeeting() {
        return meeting;
    }

    public void setMeeting(String meeting) {
        this.meeting = meeting;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
