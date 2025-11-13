package com.school.Smart.Campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.Smart.Campus.model.Course;


@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    // Example custom queries:
    // List<Course> findByLecturer(String lecturer);
    // List<Course> findByDay(String day);
}
