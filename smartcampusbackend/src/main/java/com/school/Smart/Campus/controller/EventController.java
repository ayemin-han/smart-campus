package com.school.Smart.Campus.controller;

import com.school.Smart.Campus.model.Admin;
import com.school.Smart.Campus.model.Event;
import com.school.Smart.Campus.repository.AdminRepository;
import com.school.Smart.Campus.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // Allow frontend access if hosted separately
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // For WebSocket broadcasting

    // ✅ Create Event
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        // Set current date if none provided
        if (event.getDate() == null) {
            event.setDate(LocalDate.now());
        }

        // Fetch admin safely using adminId from the event object
        if (event.getAdmin() == null || event.getAdmin().getAdminId() == 0) {
            return ResponseEntity.badRequest().body(null);
        }

        Admin admin = adminRepository.findById(event.getAdmin().getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // Create and populate new event entity
        Event newEvent = new Event();
        newEvent.setTitle(event.getTitle());
        newEvent.setType(event.getType());
        newEvent.setDate(event.getDate());
        newEvent.setTime(event.getTime());
        newEvent.setLocation(event.getLocation());
        newEvent.setAdmin(admin);

        // Save the new event
        Event savedEvent = eventRepository.save(newEvent);

        // Broadcast new event to WebSocket subscribers
        messagingTemplate.convertAndSend("/topic/events", savedEvent);

        return ResponseEntity.ok(savedEvent);
    }

    // ✅ Get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // ✅ Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable int id) {
        Optional<Event> event = eventRepository.findById(id);
        return event.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get events by type
    @GetMapping("/type/{type}")
    public List<Event> getEventsByType(@PathVariable String type) {
        return eventRepository.findByType(type);
    }

    // ✅ Get events between specific dates
    @GetMapping("/date-range")
    public List<Event> getEventsByDateRange(@RequestParam("start") String start,
                                            @RequestParam("end") String end) {
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
        return eventRepository.findByDateBetween(startDate, endDate);
    }

    // ✅ Get events organized by admin
    @GetMapping("/admin/{adminId}")
    public List<Event> getEventsByAdmin(@PathVariable int adminId) {
        return eventRepository.findByAdmin_AdminId(adminId);
    }

    // ✅ Search events by keyword (in title or type)
    @GetMapping("/search")
    public List<Event> searchEvents(@RequestParam("q") String keyword) {
        return eventRepository.findByTitleContainingIgnoreCaseOrTypeContainingIgnoreCase(keyword, keyword);
    }

    // ✅ Get events by location
    @GetMapping("/location/{location}")
    public List<Event> getEventsByLocation(@PathVariable String location) {
        return eventRepository.findByLocationContainingIgnoreCase(location);
    }

    // ✅ Update Event
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable int id, @RequestBody Event updatedEvent) {
        Optional<Event> existingEventOpt = eventRepository.findById(id);
        if (existingEventOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Event event = existingEventOpt.get();

        // Update basic fields
        event.setTitle(updatedEvent.getTitle());
        event.setType(updatedEvent.getType());
        event.setDate(updatedEvent.getDate());
        event.setTime(updatedEvent.getTime());
        event.setLocation(updatedEvent.getLocation());

        // Fetch full Admin from DB if adminId is provided
        if (updatedEvent.getAdmin() != null && updatedEvent.getAdmin().getAdminId() != 0) {
            Admin admin = adminRepository.findById(updatedEvent.getAdmin().getAdminId())
                    .orElseThrow(() -> new RuntimeException("Admin not found"));
            event.setAdmin(admin);
        }

        // Save updated event
        Event savedEvent = eventRepository.save(event);

        // Broadcast updated event
        messagingTemplate.convertAndSend("/topic/events", savedEvent);

        return ResponseEntity.ok(savedEvent);
    }

    // ✅ Delete Event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable int id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        eventRepository.deleteById(id);

        // Broadcast deletion (send event ID)
        messagingTemplate.convertAndSend("/topic/events", "deleted:" + id);

        return ResponseEntity.noContent().build();
    }
}
