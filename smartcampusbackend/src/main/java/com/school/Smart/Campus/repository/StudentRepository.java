package com.school.Smart.Campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import jakarta.transaction.Transactional;

import com.school.Smart.Campus.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Optional: custom query methods
      @Modifying
    @Transactional
    @Query("DELETE FROM Student s WHERE s.id = :id")
    void deleteStudentById(Integer id);
    Student findByUser_UserId(Integer userId); // fetch student by User ID
    List<Student> findByProgramContainingIgnoreCase(String program);
  
}
