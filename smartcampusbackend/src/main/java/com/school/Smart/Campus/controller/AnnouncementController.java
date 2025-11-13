package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Admin;
import com.school.Smart.Campus.model.Announcement;
import com.school.Smart.Campus.repository.AdminRepository;
import com.school.Smart.Campus.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*") // Allow cross-origin if frontend is separate
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // ✅ Enables WebSocket updates

    // ✅ Create a new Announcement
    @PostMapping
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {

        // ✅ Set current date if not provided
        if (announcement.getDate() == null) {
            announcement.setDate(LocalDate.now());
        }

        // ✅ Validate and fetch Admin from DB
        if (announcement.getAdmin() == null || announcement.getAdmin().getAdminId() == 0) {
            return ResponseEntity.badRequest().build(); // Admin must be provided
        }

        Admin admin = adminRepository.findById(announcement.getAdmin().getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // ✅ Create a new Announcement entity
        Announcement newAnnouncement = new Announcement();
        newAnnouncement.setName(announcement.getName());
        newAnnouncement.setContent(announcement.getContent());
        newAnnouncement.setCategory(announcement.getCategory());
        newAnnouncement.setDate(announcement.getDate());
        newAnnouncement.setAdmin(admin);

        // ✅ Save the new announcement
        Announcement savedAnnouncement = announcementRepository.save(newAnnouncement);

        // ✅ Send real-time update via WebSocket
        messagingTemplate.convertAndSend("/topic/announcements", savedAnnouncement);

        return ResponseEntity.ok(savedAnnouncement);
    }

    // ✅ Get all announcements
    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementRepository.findAll();
        return ResponseEntity.ok(announcements);
    }

    // ✅ Get announcement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable int id) {
        Optional<Announcement> announcement = announcementRepository.findById(id);
        return announcement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get announcements by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Announcement>> getAnnouncementsByCategory(@PathVariable String category) {
        List<Announcement> categoryList = announcementRepository.findByCategory(category);
        return ResponseEntity.ok(categoryList);
    }

    // ✅ Get announcements between dates
    @GetMapping("/date-range")
    public ResponseEntity<List<Announcement>> getAnnouncementsByDateRange(
            @RequestParam("start") String start,
            @RequestParam("end") String end) {
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
        List<Announcement> dateBetweenList = announcementRepository.findByDateBetween(startDate, endDate);
        return ResponseEntity.ok(dateBetweenList);
    }

    // ✅ Get announcements by admin ID
    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Announcement>> getAnnouncementsByAdmin(@PathVariable int adminId) {
        List<Announcement> adminAnnouncements = announcementRepository.findByAdmin_AdminId(adminId);
        return ResponseEntity.ok(adminAnnouncements);
    }

    // ✅ Search announcements by keyword (name or content)
    @GetMapping("/search")
    public ResponseEntity<List<Announcement>> searchAnnouncements(@RequestParam("q") String query) {
        List<Announcement> searchList =
                announcementRepository.findByNameContainingIgnoreCaseOrContentContainingIgnoreCase(query, query);
        return ResponseEntity.ok(searchList);
    }

    // ✅ Update an announcement
    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable int id, @RequestBody Announcement updatedAnnouncement) {

        Optional<Announcement> existingAnnouncementOpt = announcementRepository.findById(id);
        if (existingAnnouncementOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Announcement announcement = existingAnnouncementOpt.get();

        // ✅ Update basic fields
        announcement.setName(updatedAnnouncement.getName());
        announcement.setContent(updatedAnnouncement.getContent());
        announcement.setCategory(updatedAnnouncement.getCategory());

        // ✅ Update date, default to today if null
        announcement.setDate(updatedAnnouncement.getDate() != null ? updatedAnnouncement.getDate() : LocalDate.now());

        // ✅ Fetch full Admin from DB if adminId is provided
        if (updatedAnnouncement.getAdmin() != null && updatedAnnouncement.getAdmin().getAdminId() != 0) {
            Admin admin = adminRepository.findById(updatedAnnouncement.getAdmin().getAdminId())
                    .orElseThrow(() -> new RuntimeException("Admin not found"));
            announcement.setAdmin(admin);
        }

        // ✅ Save updated announcement
        Announcement savedAnnouncement = announcementRepository.save(announcement);

        // ✅ Send WebSocket update
        messagingTemplate.convertAndSend("/topic/announcements", savedAnnouncement);

        return ResponseEntity.ok(savedAnnouncement);
    }

    // ✅ Delete an announcement by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable int id) {
        if (!announcementRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        announcementRepository.deleteById(id);

        // ✅ Notify clients via WebSocket about deletion
        messagingTemplate.convertAndSend("/topic/announcements", "deleted:" + id);

        return ResponseEntity.noContent().build();
    }
}
