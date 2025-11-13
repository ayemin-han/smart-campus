package com.school.Smart.Campus.model;

import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Admin")
public class Admin {

    @Id
    @Column(name = "Admin_ID")
    private int adminId;

    @OneToOne
    @JoinColumn(name = "Admin_ID", referencedColumnName = "User_ID")
    private User user;

    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "Ph_no", length = 20)
    private String phNo;

    @Column(name = "Department", length = 100)
    private String department;

    // Optional: events and announcements created by this admin
    @OneToMany(mappedBy = "admin")
    @JsonIgnoreProperties("admin")
    private Set<Event> events;

    @OneToMany(mappedBy = "admin")
    @JsonIgnoreProperties("admin")
    private Set<Announcement> announcements;

    // Constructors
    public Admin() {}

    public Admin(User user, String name, String email, String phNo, String department) {
        this.user = user;
        this.name = name;
        this.email = email;
        this.phNo = phNo;
        this.department = department;
    }

    // Getters and Setters
    public int getAdminId() { return adminId; }
    public void setAdminId(int adminId) { this.adminId = adminId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhNo() { return phNo; }
    public void setPhNo(String phNo) { this.phNo = phNo; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Set<Event> getEvents() { return events; }
    public void setEvents(Set<Event> events) { this.events = events; }

    public Set<Announcement> getAnnouncements() { return announcements; }
    public void setAnnouncements(Set<Announcement> announcements) { this.announcements = announcements; }
}

