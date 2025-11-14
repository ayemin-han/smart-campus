// src/components/academic/GradesList.js
import React, { useEffect, useState } from 'react';
import { mockData } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const GradesList = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchStudentCourses = async () => {
      if (!studentId) {
        setError('Student not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/courses/student/${studentId}`);
        setSchedule(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load schedule.');
        setLoading(false);
      }
    };

    fetchStudentCourses();
  }, [studentId]);

  if (loading) return <p>Loading schedule...</p>;
  if (error) return <p>{error}</p>;

  // Only show the first 3 courses
  const displayedCourses = schedule.slice(0, 4);

  return (
    <div className="section-card">
      <h2>Recent Grades</h2>
      <div className="grades-list">
        {displayedCourses.map((course, i) => (
          <div key={i} className="grade-item">
            <div className="grade-info">
              <div className="grade-course">{course.title}</div>
              <div className="grade-credits">Credits</div>
            </div>
            <div >
              -
            </div>
          </div>
        ))}
      </div>
      <button className="btn-secondary full-width" onClick={() => navigate('/grades')}>View All Grades</button>
    </div>
  );
};

export default GradesList;