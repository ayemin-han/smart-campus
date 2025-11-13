package com.school.Smart.Campus.repository;

import com.school.Smart.Campus.model.Club;
import com.school.Smart.Campus.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Integer> {

}
