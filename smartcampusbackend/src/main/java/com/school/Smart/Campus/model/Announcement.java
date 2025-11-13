package com.school.Smart.Campus.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Announcement")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Announcement_ID")
    private int announcementId;

    @Column(name = "Name", length = 100)
    private String name;

    @Column(name = "Content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "Category", length = 50)
    private String category;

    @Column(name = "Date")
    private LocalDate date;

    @ManyToOne(fetch = FetchType.EAGER)    
    @JoinColumn(name = "Admin_ID", referencedColumnName = "Admin_ID")
    @JsonIgnoreProperties({"announcements"})
    private Admin admin;

    // Constructors
    public Announcement() {
    }

    public Announcement(int announcementId, String name, String content, String category, LocalDate date, Admin admin) {
        this.announcementId = announcementId;
        this.name = name;
        this.content = content;
        this.category = category;
        this.date = date;
        this.admin = admin;
    }

    // Getters and Setters
    public int getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(int announcementId) {
        this.announcementId = announcementId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }
}
