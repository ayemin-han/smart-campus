package com.school.Smart.Campus.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Event_ID")
    private int eventId;

    @Column(name = "Title", length = 100)
    private String title;

    @Column(name = "Type", length = 50)
    private String type;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "Time", length = 20)
    private String time;

    @Column(name = "Location", length = 100)
    private String location;

    @ManyToOne(fetch = FetchType.EAGER)    
    @JoinColumn(name = "Admin_ID", referencedColumnName = "Admin_ID")
    @JsonIgnoreProperties({"events"})
    private Admin admin;

    // Constructors
    public Event() {
    }

    public Event(int eventId, String title, String type, LocalDate date, String time, String location, Admin admin) {
        this.eventId = eventId;
        this.title = title;
        this.type = type;
        this.date = date;
        this.time = time;
        this.location = location;
        this.admin = admin;
    }

    // Getters and Setters
    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }


}

