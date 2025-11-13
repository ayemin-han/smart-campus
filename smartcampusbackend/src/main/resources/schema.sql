-- DROP DATABASE IF EXISTS smartcampus;
-- CREATE DATABASE IF NOT EXISTS smartcampus;
-- USE smartcampus;
-- ===========================
-- USER TABLE
-- ===========================
DROP TABLE IF EXISTS  User;
CREATE TABLE User (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Is_Admin BOOLEAN NOT NULL
);

-- ===========================
-- ADVISOR TABLE
-- ===========================
DROP TABLE  IF EXISTS Advisor;

CREATE TABLE  Advisor (
    Advisor_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Ph_no VARCHAR(20),
    Department VARCHAR(100),
    Title VARCHAR(50)
);


-- ===========================
-- COURSE TABLE
-- ===========================
DROP TABLE  IF EXISTS Course;

CREATE TABLE Course (
    Course_Code VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(100),
    Room VARCHAR(50),
    Day VARCHAR(20),
    Time VARCHAR(20),
    Lecturer VARCHAR(100)
);

-- ===========================
-- CLUBS TABLE
-- ===========================
DROP TABLE  IF EXISTS Clubs;

CREATE TABLE Clubs (
    Club_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Members INT,
    Category VARCHAR(50),
    Meeting VARCHAR(50),
    Status VARCHAR(50)
);

-- ===========================
-- SCHOLARSHIP TABLE
-- ===========================
DROP TABLE  IF EXISTS Scholarship;

CREATE TABLE Scholarship (
    Scholarship_ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100),
    Amount DECIMAL(10,2),
    Type VARCHAR(50),
    Duration VARCHAR(50),
    Requirement TEXT
);

-- ===========================
-- STUDENT TABLE
-- ===========================
DROP TABLE  IF EXISTS Student;

CREATE TABLE Student (
    Student_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Ph_no VARCHAR(20),
    Program VARCHAR(100),
    GPA DECIMAL(3,2),
    User_ID INT UNIQUE,
    Advisor_ID INT,
    Scholarship_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Advisor_ID) REFERENCES Advisor(Advisor_ID)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (Scholarship_ID) REFERENCES Scholarship(Scholarship_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- ===========================
-- ADMIN TABLE
-- ===========================
DROP TABLE  IF EXISTS Admin;

CREATE TABLE Admin (
    Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Ph_no VARCHAR(20),
    Department VARCHAR(100),
    FOREIGN KEY (Admin_ID) REFERENCES User(User_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- ===========================
-- EVENTS TABLE
-- ===========================
DROP TABLE  IF EXISTS Events;

CREATE TABLE Events (
    Event_ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100),
    Type VARCHAR(50),
    Date DATE,
    Time VARCHAR(20),
    Location VARCHAR(100),
    Admin_ID INT,
    FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- ===========================
-- ANNOUNCEMENT TABLE
-- ===========================
DROP TABLE  IF EXISTS Announcement;

CREATE TABLE Announcement (
    Announcement_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Content TEXT,
    Category VARCHAR(50),
    Date DATE,
    Admin_ID INT,
    FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- ===========================
-- RELATIONSHIP TABLES
-- ===========================

-- Student ↔ Course
DROP TABLE  IF EXISTS Enroll;

CREATE TABLE Enroll (
    Student_ID INT,
    Course_Code VARCHAR(20),
    PRIMARY KEY (Student_ID, Course_Code),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Course_Code) REFERENCES Course(Course_Code)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Student ↔ Clubs
DROP TABLE  IF EXISTS Student_Clubs;

CREATE TABLE Student_Clubs (
    Student_ID INT,
    Club_ID INT,
    PRIMARY KEY (Student_ID, Club_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Club_ID) REFERENCES Clubs(Club_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
);
-- Admin user
INSERT  INTO User (Username, Password, Is_Admin)
VALUES ('admin', 'admin123', TRUE);

-- Student user
INSERT  INTO User (Username, Password, Is_Admin)
VALUES ('student1', 'student123', FALSE);
INSERT  INTO User (Username, Password, Is_Admin)
VALUES ('student2', 'student123', FALSE);
INSERT  INTO User (Username, Password, Is_Admin)
VALUES ('student3', 'student123', FALSE);
INSERT  INTO User (Username, Password, Is_Admin)
VALUES ('student4', 'student123', FALSE);
INSERT  INTO User (Username, Password, Is_Admin)
VALUES ('student5', 'student123', FALSE);

INSERT  INTO Advisor (Name, Email, Ph_no, Department, Title) VALUES
('Dr. John Smith', 'john.smith@university.edu', '0812345678', 'Computer Science', 'Professor'),
('Dr. Emily Brown', 'emily.brown@university.edu', '0898765432', 'Mathematics', 'Associate Professor'),
('Dr. Michael Lee', 'michael.lee@university.edu', '0823456789', 'Physics', 'Lecturer');

INSERT  INTO Course (Course_Code, Title, Room, Day, Time, Lecturer) VALUES
('CS101', 'Introduction to Computer Science', 'Room 101', 'Monday', '09:00-11:00', 'Dr. John Smith'),
('MATH201', 'Calculus II', 'Room 202', 'Tuesday', '10:00-12:00', 'Dr. Emily Brown'),
('PHY150', 'Physics I', 'Room 303', 'Wednesday', '13:00-15:00', 'Dr. Michael Lee'),
('ENG301', 'Advanced English Literature', 'Room 404', 'Thursday', '14:00-16:00', 'Prof. Laura Green'),
('BIO110', 'Introduction to Biology', 'Room 505', 'Friday', '08:00-10:00', 'Dr. Sarah White');

INSERT  INTO Clubs (Name, Members, Category, Meeting, Status) VALUES
('Science Club', 25, 'Academic', 'Monday 15:00', 'Active'),
('Drama Club', 18, 'Arts', 'Wednesday 16:00', 'Active'),
('Sports Club', 40, 'Sports', 'Friday 14:00', 'Active'),
('Music Club', 20, 'Arts', 'Tuesday 17:00', 'Inactive'),
('Chess Club', 15, 'Recreational', 'Thursday 16:30', 'Active');


INSERT  INTO Scholarship (Title, Amount, Type, Duration, Requirement) VALUES
('Merit Scholarship', 2000.00, 'Merit-based', '1 Year', 'Minimum GPA of 3.5'),
('Sports Excellence', 1500.00, 'Sports', '2 Semesters', 'Active participation in university sports teams'),
('Need-based Aid', 1000.00, 'Financial Aid', '1 Year', 'Demonstrated financial need'),
('Research Grant', 2500.00, 'Research', '6 Months', 'Involvement in faculty research projects'),
('Community Service Award', 1200.00, 'Service', '1 Year', 'At least 100 hours of community service');

-- Student 1: Has scholarship, no club
INSERT  INTO Student (Name, Email, Ph_no, Program, GPA, User_ID, Advisor_ID, Scholarship_ID)
VALUES ('Alice Johnson', 'alice.johnson@example.com', '0812345678', 'Computer Science', 3.8, 2, 1, 1);

-- Student 2: Has club, no scholarship
INSERT  INTO Student (Name, Email, Ph_no, Program, GPA, User_ID, Advisor_ID)
VALUES ('Bob Smith', 'bob.smith@example.com', '0898765432', 'Mechanical Engineering', 3.2, 1, 2);

-- Student 3: Has both club and scholarship
INSERT  INTO Student (Name, Email, Ph_no, Program, GPA, User_ID, Advisor_ID, Scholarship_ID)
VALUES ('Charlie Brown', 'charlie.brown@example.com', '0823456789', 'Electrical Engineering', 3.5, 4, 1, 2);

-- Student 4: Has neither club nor scholarship
INSERT  INTO Student (Name, Email, Ph_no, Program, GPA, User_ID, Advisor_ID)
VALUES ('Diana Prince', 'diana.prince@example.com', '0876543210', 'Business Administration', 3.0, 5, 2);

-- Student 5: Has only club, no scholarship
INSERT  INTO Student (Name, Email, Ph_no, Program, GPA, User_ID, Advisor_ID)
VALUES ('Ethan Hunt', 'ethan.hunt@example.com', '0865432198', 'Civil Engineering', 3.6, 3, 1);

INSERT  INTO Admin (Admin_ID, Name, Email, Ph_no, Department)
VALUES (1, 'John Doe', 'john.doe@example.com', '0812345678', 'IT Department');

-- Enroll students in courses
INSERT  INTO Enroll (Student_ID, Course_Code) VALUES
(1, 'CS101'),
(1, 'MATH201'),
(2, 'PHY150'),
(2, 'ENG301'),
(3, 'CS101'),
(3, 'BIO110'),
(4, 'MATH201'),
(4, 'ENG301'),
(5, 'PHY150'),
(5, 'BIO110');

-- Student ↔ Clubs associations
INSERT  INTO Student_Clubs (Student_ID, Club_ID) VALUES
(1, 1),   -- Student 1 is in Club 1
(1, 2),   -- Student 1 is also in Club 2
(2, 3),   -- Student 2 is in Club 3
(3, 4),   -- Student 3 is in Club 4
(4, 5);   -- Student 4 is in Club 5