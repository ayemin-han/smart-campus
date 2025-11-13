package com.school.Smart.Campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.school.Smart.Campus.model.Scholarship;


@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, Integer> {
    // Example custom queries:
    // List<Scholarship> findByType(String type);
    // List<Scholarship> findByAmountGreaterThan(double amount);
}

