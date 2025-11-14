// src/pages/AcademicServices.js
import React, { useEffect, useState } from 'react';
import { BookOpen, Award, TrendingUp } from 'lucide-react';
import ScheduleList from '../components/academic/ScheduleList';
import GradesList from '../components/academic/GradesList';
import EnrollmentList from '../components/academic/EnrollmentList';
import api from '../../api';
import { AIChatbotWrapper } from "../components/chatbot/AIChatbotWrapper";

const AcademicServices = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [gpa, setGpa] = useState('-'); // placeholder for future use
  const [credits, setCredits] = useState('-'); // placeholder
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchStudentCourses = async () => {
      if (!studentId) return;

      try {
        const response = await api.get(`/courses/student/${studentId}`);
        setCourseCount(response.data.length);
      } catch (error) {
        console.error('Error fetching student courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCourses();
  }, [studentId]);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Academic Services</h1>
        <p>Manage your academic life - schedules, grades, and enrollment</p>
      </div>

      <div className="stats-row">
        <div className="stat-box blue">
          <BookOpen size={24} />
          <div>
            <div className="stat-label">Current Courses</div>
            <div className="stat-number">
              {loading ? '-' : courseCount}
            </div>
          </div>
        </div>
        <div className="stat-box green">
          <Award size={24} />
          <div>
            <div className="stat-label">GPA</div>
            <div className="stat-number">-</div>
          </div>
        </div>
        <div className="stat-box purple">
          <TrendingUp size={24} />
          <div>
            <div className="stat-label">Credits</div>
            <div className="stat-number">-</div>
          </div>
        </div>
      </div>

      <ScheduleList />

      <div className="two-column-grid">
        <GradesList />
        <EnrollmentList />
      </div>
    </div>
  );
};

export default AcademicServices;
