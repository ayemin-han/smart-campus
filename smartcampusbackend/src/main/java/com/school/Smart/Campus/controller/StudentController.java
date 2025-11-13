package com.school.Smart.Campus.controller;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;

import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.Smart.Campus.model.Advisor;
import com.school.Smart.Campus.model.Club;
import com.school.Smart.Campus.model.Course;
import com.school.Smart.Campus.model.Scholarship;
import com.school.Smart.Campus.model.Student;
import com.school.Smart.Campus.model.User;
import com.school.Smart.Campus.repository.AdvisorRepository;
import com.school.Smart.Campus.repository.ClubRepository;
import com.school.Smart.Campus.repository.CourseRepository;
import com.school.Smart.Campus.repository.ScholarshipRepository;
import com.school.Smart.Campus.repository.StudentRepository;
import com.school.Smart.Campus.repository.UserRepository;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final AdvisorRepository advisorRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final ClubRepository clubRepository;
    private final CourseRepository courseRepository;

   public StudentController(StudentRepository studentRepository,
                         UserRepository userRepository,
                         AdvisorRepository advisorRepository,
                         CourseRepository courseRepository,
                         ClubRepository clubRepository,
                         ScholarshipRepository scholarshipRepository) {
    this.studentRepository = studentRepository;
    this.userRepository = userRepository;
    this.advisorRepository = advisorRepository;
    this.courseRepository = courseRepository;
    this.clubRepository = clubRepository;
    this.scholarshipRepository = scholarshipRepository;
}

 
   @GetMapping
    public List<Student> getStudents(@RequestParam(required = false) String program) {
        if (program != null && !program.isEmpty()) {
            return studentRepository.findByProgramContainingIgnoreCase(program);
        }
        return studentRepository.findAll();
    }

    // @GetMapping
    // public List<Student> getAllStudents() {
    //     return studentRepository.findAll();
    // }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }



@Transactional
@PostMapping
public ResponseEntity<?> createStudent(@RequestBody Student student) {
    try {
        // Validate User (required)
        System.out.println("Hello this is post method");
        User user = userRepository.findById(student.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID " + student.getUser().getUserId()));

        // Optional Advisor
        Advisor advisor = null;
        if (student.getAdvisor() != null && student.getAdvisor().getAdvisorId() != 0) {
            advisor = advisorRepository.findById(student.getAdvisor().getAdvisorId()).orElse(null);
        }

        // Optional Scholarship
        Scholarship scholarship = null;
        if (student.getScholarship() != null && student.getScholarship().getScholarshipId() != 0) {
            scholarship = scholarshipRepository.findById(student.getScholarship().getScholarshipId()).orElse(null);
        }

        // Fetch existing courses from DB (based on courseCodes sent from frontend)
        Set<Course> courses = new HashSet<>();
        if (student.getCourses() != null && !student.getCourses().isEmpty()) {
            Set<String> codes = student.getCourses()
                    .stream()
                    .map(Course::getCourseCode)
                    .collect(Collectors.toSet());
            courses = new HashSet<>(courseRepository.findAllById(codes));
            System.out.println("Courses found: " + courses.size());
        }

        // Fetch existing clubs from DB (based on clubIds sent from frontend)
        Set<Club> clubs = new HashSet<>();
        if (student.getClubs() != null && !student.getClubs().isEmpty()) {
            Set<Integer> ids = student.getClubs()
                    .stream()
                    .map(Club::getClubId)
                    .collect(Collectors.toSet());
            clubs = new HashSet<>(clubRepository.findAllById(ids));
            System.out.println("Clubs found: " + clubs.size());
        }

        // Create and populate new student
        Student newStudent = new Student();
        newStudent.setName(student.getName());
        newStudent.setEmail(student.getEmail());
        newStudent.setPhNo(student.getPhNo());
        newStudent.setProgram(student.getProgram());
        newStudent.setGpa(student.getGpa());
        newStudent.setUser(user);
        newStudent.setAdvisor(advisor);
        newStudent.setScholarship(scholarship);

        // Add relationships properly using helper methods
        for (Course c : courses) {
            newStudent.addCourse(c); // ensure helper method exists in Student
        }

        for (Club cl : clubs) {
            newStudent.addClub(cl); // ensure helper method exists in Student
        }

        // Save and return
        Student saved = studentRepository.save(newStudent);
        return ResponseEntity.ok(saved);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
}


@PutMapping("/{id}")
@Transactional
public ResponseEntity<?> updateStudent(@PathVariable int id, @RequestBody Student studentDetails) {
    try {
        // 1️⃣ Find existing student
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID " + id));

        // 2️⃣ Validate and fetch User
        if (studentDetails.getUser() != null && studentDetails.getUser().getUserId() != 0) {
            User user = userRepository.findById(studentDetails.getUser().getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID " + studentDetails.getUser().getUserId()));
            existingStudent.setUser(user);
        }

        // 3️⃣ Optional Advisor
        Advisor advisor = null;
        if (studentDetails.getAdvisor() != null && studentDetails.getAdvisor().getAdvisorId() != 0) {
            advisor = advisorRepository.findById(studentDetails.getAdvisor().getAdvisorId()).orElse(null);
        }
        existingStudent.setAdvisor(advisor);

        // 4️⃣ Optional Scholarship
        Scholarship scholarship = null;
        if (studentDetails.getScholarship() != null && studentDetails.getScholarship().getScholarshipId() != 0) {
            scholarship = scholarshipRepository.findById(studentDetails.getScholarship().getScholarshipId()).orElse(null);
        }
        existingStudent.setScholarship(scholarship);

        // 5️⃣ Update basic info
        existingStudent.setName(studentDetails.getName());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setPhNo(studentDetails.getPhNo());
        existingStudent.setProgram(studentDetails.getProgram());
        existingStudent.setGpa(studentDetails.getGpa());

        // 6️⃣ Update courses
        Set<Course> courses = new HashSet<>();
        if (studentDetails.getCourses() != null && !studentDetails.getCourses().isEmpty()) {
            Set<String> codes = studentDetails.getCourses().stream()
                    .map(Course::getCourseCode)
                    .collect(Collectors.toSet());
            courses = new HashSet<>(courseRepository.findAllById(codes));
        }
        existingStudent.getCourses().clear();
        for (Course c : courses) {
            existingStudent.addCourse(c);
        }

        // 7️⃣ Update clubs
        Set<Club> clubs = new HashSet<>();
        if (studentDetails.getClubs() != null && !studentDetails.getClubs().isEmpty()) {
            Set<Integer> ids = studentDetails.getClubs().stream()
                    .map(Club::getClubId)
                    .collect(Collectors.toSet());
            clubs = new HashSet<>(clubRepository.findAllById(ids));
        }
        existingStudent.getClubs().clear();
        for (Club cl : clubs) {
            existingStudent.addClub(cl);
        }

        // 8️⃣ Save updated entity
        Student updatedStudent = studentRepository.save(existingStudent);

        return ResponseEntity.ok(updatedStudent);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating student: " + e.getMessage());
    }
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deleteStudent(@PathVariable int id) {
    // Call repository delete
    studentRepository.deleteStudentById(id);

    // Return success message
    return ResponseEntity.ok("Student deleted successfully");
}


}
