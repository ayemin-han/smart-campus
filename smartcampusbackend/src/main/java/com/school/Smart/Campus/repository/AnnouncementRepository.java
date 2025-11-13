package com.school.Smart.Campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.school.Smart.Campus.model.Announcement;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

    // Find announcements by category
    List<Announcement> findByCategory(String category);

    // Find announcements between two dates
    List<Announcement> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // Find announcements by admin ID (based on foreign key relationship)
    List<Announcement> findByAdmin_AdminId(int adminId);

    // Find announcements containing specific keywords in the name or content
    List<Announcement> findByNameContainingIgnoreCaseOrContentContainingIgnoreCase(String nameKeyword, String contentKeyword);
}
