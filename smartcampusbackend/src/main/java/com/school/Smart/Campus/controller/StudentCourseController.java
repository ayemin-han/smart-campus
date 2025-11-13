package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Student;
import com.school.Smart.Campus.model.Course;
import com.school.Smart.Campus.repository.StudentRepository;
import com.school.Smart.Campus.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StudentCourseController {

    private final StudentRepository studentRepo;
    private final CourseRepository courseRepo;

    public StudentCourseController(StudentRepository studentRepo, CourseRepository courseRepo) {
        this.studentRepo = studentRepo;
        this.courseRepo = courseRepo;
    }

    // ✅ Get all student-course relationships
    @GetMapping("/student-courses")
    public ResponseEntity<List<Map<String, Object>>> getAllStudentCourses() {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Student student : studentRepo.findAll()) {
            for (Course course : student.getCourses()) {
                Map<String, Object> map = new HashMap<>();
                map.put("studentId", student.getStudentId());
                map.put("courseCode", course.getCourseCode());
                map.put("courseId", course.getCourseCode()); // optional: if you want a separate id
                result.add(map);
            }
        }
        return ResponseEntity.ok(result);
    }

    // ✅ Delete a student-course relationship
    @DeleteMapping("/student-courses/{studentId}/{courseCode}")
    public ResponseEntity<?> dropCourse(@PathVariable int studentId, @PathVariable String courseCode) {
        Optional<Student> studentOpt = studentRepo.findById(studentId);
        Optional<Course> courseOpt = courseRepo.findById(courseCode);

        if (studentOpt.isPresent() && courseOpt.isPresent()) {
            Student student = studentOpt.get();
            Course course = courseOpt.get();
            if (student.getCourses().remove(course)) {
                studentRepo.save(student);
                return ResponseEntity.ok("Course dropped successfully!");
            } else {
                return ResponseEntity.badRequest().body("Student was not enrolled in this course");
            }
        }
        return ResponseEntity.badRequest().body("Invalid student ID or course code");
    }
}
