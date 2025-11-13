package com.school.Smart.Campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.school.Smart.Campus.model.Admin;
import com.school.Smart.Campus.model.User;
import java.util.Optional;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    // Example custom query methods:
    // Admin findByEmail(String email);
    // List<Admin> findByDepartment(String department);
     Optional<Admin> findByUser(User user);
}
