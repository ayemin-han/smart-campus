package com.school.Smart.Campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.Smart.Campus.model.Advisor;


@Repository
public interface AdvisorRepository extends JpaRepository<Advisor, Integer> {
  
}