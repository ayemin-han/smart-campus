package com.school.Smart.Campus.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Student")
// @JsonIgnoreProperties({"advisor", "courses", "clubs", "scholarship"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Student_ID")
    private int studentId;

    @Column(name = "Name", length = 100)
    private String name;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "Ph_no", length = 20)
    private String phNo;

    @Column(name = "Program", length = 100)
    private String program;

    @Column(name = "GPA")
    private Float gpa;

    @OneToOne
    @JoinColumn(name = "User_ID", referencedColumnName = "User_ID")
    private User user;

    @ManyToMany(cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
        name = "Enroll",
        joinColumns = @JoinColumn(name = "Student_ID"),
        inverseJoinColumns = @JoinColumn(name = "Course_Code")
    )
    private Set<Course> courses = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
        name = "Student_Clubs",
        joinColumns = @JoinColumn(name = "Student_ID"),
        inverseJoinColumns = @JoinColumn(name = "Club_ID")
    )
    private Set<Club> clubs = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "Advisor_ID")
    @JsonBackReference("student-advisor")
    private Advisor advisor;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Scholarship_ID")
    @JsonBackReference("student-scholarship")
    private Scholarship scholarship;


    // ===== Helper Methods for bidirectional sync =====
    public void addCourse(Course course) {
        this.courses.add(course);
        course.getStudents().add(this);
    }

    public void removeCourse(Course course) {
        this.courses.remove(course);
        course.getStudents().remove(this);
    }

    public void addClub(Club club) {
        this.clubs.add(club);
        club.getStudents().add(this);
    }

    public void removeClub(Club club) {
        this.clubs.remove(club);
        club.getStudents().remove(this);
    }

    // ===== Constructors =====
    public Student() {}

    public Student(String name) {
        this.name = name;
    }

    // ===== Getters and Setters =====
    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhNo() {
        return phNo;
    }

    public void setPhNo(String phNo) {
        this.phNo = phNo;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public Float getGpa() {
        return gpa;
    }

    public void setGpa(Float gpa) {
        this.gpa = gpa;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Advisor getAdvisor() {
        return advisor;
    }

    public void setAdvisor(Advisor advisor) {
        this.advisor = advisor;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Club> getClubs() {
        return clubs;
    }

    public void setClubs(Set<Club> clubs) {
        this.clubs = clubs;
    }

    public Scholarship getScholarship() {
        return scholarship;
    }

    public void setScholarship(Scholarship scholarship) {
        this.scholarship = scholarship;
    }
}
