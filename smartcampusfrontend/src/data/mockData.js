// src/data/mockData.js
export const mockData = {
  user: {
    name: 'John Smith',
    id: '650123456',
    email: 'john.smith@mfu.ac.th',
    phone: '+66 12 345 6789',
    program: 'Computer Science',
    year: '3rd Year',
    gpa: '3.7/4.0',
    credits: '85/120'
  },
   student: {
    gpa: 3.75,
    totalCredits: 18,
  },
  
  dashboard: {
    stats: {
      studentsOnCampus: { value: 1753, change: '+12.3%', active: true },
      todayEvents: { value: 24, happening: 8, starting: 6 },
      wifiNetworks: { value: 15, status: 'Active' },
      clubActivities: { value: 12, active: true },
      servicesAvailable: { value: 18 }
    },
    recentUpdates: [
      { title: 'Career Fair Tomorrow', subtitle: 'Student Center, 9:00 AM - 4:00 PM', type: 'event' },
      { title: 'Library Extended Hours', subtitle: 'Now open 24/7 during finals', type: 'info' },
      { title: 'New Course Registration', subtitle: 'Spring semester opens Jan 15', type: 'academic' }
    ],
    academicProgress: {
      gpa: 3.7,
      credits: 18,
      coursesThisSemester: 6
    },
    campusEngagement: {
      mfuPoints: 125,
      level: 'Silver',
      eventsAttended: 8,
      clubMemberships: 3
    },
    serviceUsage: {
      library: 12,
      campusEvents: 8,
      dining: 45,
      support: 0
    }
  },

  schedule: [
    { name: 'Computer Science 101', instructor: 'Dr. Smith', room: 'Room A-201', time: '09:00 - 10:30', status: 'upcoming' },
    { name: 'Mathematics', instructor: 'Prof. Johnson', room: 'Room B-105', time: '11:00 - 12:30', status: 'in-progress' },
    { name: 'English Literature', instructor: 'Dr. Brown', room: 'Room C-301', time: '14:00 - 15:30', status: 'upcoming' },
  ],

   grades: [
    { course: 'Introduction to Computer Science' , credits: 3, grade: '-', status: '-'},
    { course: 'Calculus II', credits: 4, grade: '-', status: '-' },
    { course: 'English Literature', credits: 3, grade: 'A-', status: 'Passed' },
    { course: 'Physics', credits: 4, grade: 'B', status: 'Passed' }
  ],

  enrolledCourses: [
    { name: 'Advanced Programming', instructor: 'Dr. Wilson', schedule: 'Mon, Wed, Fri 10:00-11:35', credits: 4, available: 15, total: 30, status: 'enrolled' },
    { name: 'Database Systems', instructor: 'Prof. Davis', schedule: 'Tue, Thu 14:00-15:30', credits: 3, available: 8, total: 25, status: 'enrolled' }
  ],

  payments: {
    outstanding: 45000,
    totalPaid: 92700,
    nextDue: 'Oct 15',
    scholarships: 30000,
    history: [
      { item: 'Tuition Fee - Semester 1/2024', date: '2024-01-15', amount: 45000, status: 'paid' },
      { item: 'Library Fine', date: '2024-02-10', amount: 200, status: 'paid' },
      { item: 'Student Activity Fee', date: '2024-01-15', amount: 2500, status: 'paid' },
      { item: 'Tuition Fee - Semester 2/2024', date: '2024-08-15', amount: 45000, status: 'pending' }
    ]
  },

  scholarships: [
    { name: 'Academic Excellence Scholarship', amount: 20000, semester: 'Semester 1/2024', requirements: 'GPA ≥ 3.5', status: 'received' },
    { name: 'Community Service Scholarship', amount: 10000, semester: 'Semester 2/2024', requirements: '40+ community service hours', status: 'eligible' },
    { name: 'Research Assistant Scholarship', amount: 15000, semester: 'Semester 2/2024', requirements: 'GPA ≥ 3.0 + Research Project', status: 'application-open' }
  ],

  announcements: [
    { title: 'Semester 2/2024 Registration Opens', content: 'Course registration for Semester 2/2024 opens on October 15th. Early registration recommended.', category: 'Academic', date: '2024-10-01' },
    { title: 'New Student Health Insurance Policy', content: 'Updated health insurance coverage now includes mental health services.', category: 'Health', date: '2024-09-28' },
    { title: 'Campus WiFi Maintenance', content: 'Scheduled WiFi maintenance on October 10th from 2:00-4:00 AM.', category: 'IT', date: '2024-09-25' }
  ],

  staff: [
    { name: 'Dr. Sarah Johnson', role: 'Academic Advisor', department: 'Computer Science', email: 'sarah.johnson@mfu.ac.th', phone: '+66 53 916 234', office: 'CS Building, Room 301' },
    { name: 'Ms. Maria Garcia', role: 'Financial Aid Officer', department: 'Student Services', email: 'maria.garcia@mfu.ac.th', phone: '+66 53 916 567', office: 'Admin Building, Room 105' },
    { name: 'Mr. David Chen', role: 'Registrar', department: 'Academic Affairs', email: 'david.chen@mfu.ac.th', phone: '+66 53 916 123', office: 'Admin Building, Room 201' }
  ],

  documents: [
    { name: 'Official Transcript', description: 'Request your official academic transcript', processing: '3-5 days' },
    { name: 'Enrollment Certificate', description: 'Proof of current enrollment status', processing: '1-2 days' },
    { name: 'Degree Certificate', description: 'Official graduation certificate', processing: '5-7 days' },
    { name: 'Letter of Recommendation', description: 'Request from your advisor', processing: '7-10 days' },
    { name: 'Grade Report', description: 'Semester grade report', processing: '1-2 days' },
    { name: 'Custom Document', description: 'Request other documents', processing: 'Varies' }
  ],

  campusLife: {
    featuredEvent: {
      title: 'Career Fair 2024',
      date: 'Tomorrow, 9:00 AM - 4:00 PM',
      location: 'Student Center',
      description: 'Connect with leading employers, explore career opportunities, and take the next step in your professional journey.',
      registered: 250
    },
    upcomingEvents: [
      { name: 'Music Club Concert', date: 'Oct 8', time: '7:00 PM - 9:00 PM', location: 'Auditorium', attending: 180, category: 'Entertainment' },
      { name: 'Study Group - Finals Prep', date: 'Oct 10', time: '2:00 PM - 5:00 PM', location: 'Library Room 201', attending: 25, category: 'Academic' }
    ],
    clubs: [
      { name: 'Photography Club', members: 87, category: 'Arts', meeting: 'Every Wednesday 4:00 PM', status: 'open' },
      { name: 'Computer Science Society', members: 156, category: 'Academic', meeting: 'Every Friday 3:00 PM', status: 'open' },
      { name: 'Drama Club', members: 43, category: 'Arts', meeting: 'Every Tuesday 5:00 PM', status: 'limited' }
    ]
  }

  
};

