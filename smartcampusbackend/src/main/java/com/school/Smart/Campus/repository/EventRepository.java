package com.school.Smart.Campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.school.Smart.Campus.model.Event;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    // Find events by type (e.g., Seminar, Sports, Workshop)
    List<Event> findByType(String type);

    // Find events between two dates
    List<Event> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // Find events organized by a specific admin
    List<Event> findByAdmin_AdminId(int adminId);

    // Find events by location
    List<Event> findByLocationContainingIgnoreCase(String location);

    // Search by keyword in title or type
    List<Event> findByTitleContainingIgnoreCaseOrTypeContainingIgnoreCase(String titleKeyword, String typeKeyword);
}
