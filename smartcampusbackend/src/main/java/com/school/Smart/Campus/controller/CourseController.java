package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Course;
import com.school.Smart.Campus.model.Student;
import com.school.Smart.Campus.repository.CourseRepository;
import com.school.Smart.Campus.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*") // Allow frontend access (React, etc.)
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;


    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Course>> getCoursesByStudent(@PathVariable int studentId) {
    Optional<Student> student = studentRepository.findById(studentId);
    if (student.isPresent()) {
        List<Course> courses = student.get().getCourses().stream().toList();
        return ResponseEntity.ok(courses);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    // CREATE a new course
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        if (courseRepository.existsById(course.getCourseCode())) {
            return ResponseEntity.badRequest().build(); // Prevent duplicate ID
        }
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }

    // READ all courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return ResponseEntity.ok(courses);
    }

    // READ course by ID (courseCode)
    @GetMapping("/{courseCode}")
    public ResponseEntity<Course> getCourseById(@PathVariable String courseCode) {
        Optional<Course> course = courseRepository.findById(courseCode);
        return course.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE course by ID
    @PutMapping("/{courseCode}")
    public ResponseEntity<Course> updateCourse(@PathVariable String courseCode, @RequestBody Course updatedCourse) {
        Optional<Course> existingCourse = courseRepository.findById(courseCode);
        if (existingCourse.isPresent()) {
            Course course = existingCourse.get();
            course.setTitle(updatedCourse.getTitle());
            course.setRoom(updatedCourse.getRoom());
            course.setDay(updatedCourse.getDay());
            course.setTime(updatedCourse.getTime());
            course.setLecturer(updatedCourse.getLecturer());
            Course savedCourse = courseRepository.save(course);
            return ResponseEntity.ok(savedCourse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE course by ID
    @DeleteMapping("/{courseCode}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String courseCode) {
        if (!courseRepository.existsById(courseCode)) {
            return ResponseEntity.notFound().build();
        }
        courseRepository.deleteById(courseCode);
        return ResponseEntity.noContent().build();
    }
}
