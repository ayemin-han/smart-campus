package com.school.Smart.Campus.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Course")
public class Course {

    @Id
    @Column(name = "Course_Code", length = 20)
    private String courseCode;

    @Column(name = "Title", length = 100)
    private String title;

    @Column(name = "Room", length = 50)
    private String room;

    @Column(name = "Day", length = 20)
    private String day;

    @Column(name = "Time", length = 20)
    private String time;

    @Column(name = "Lecturer", length = 100)
    private String lecturer;

    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    // ===== Constructors =====
    public Course() {}

    public Course(String courseCode, String title, String room, String day, String time, String lecturer) {
        this.courseCode = courseCode;
        this.title = title;
        this.room = room;
        this.day = day;
        this.time = time;
        this.lecturer = lecturer;
    }

    // ===== Getters and Setters =====
    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLecturer() {
        return lecturer;
    }

    public void setLecturer(String lecturer) {
        this.lecturer = lecturer;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
