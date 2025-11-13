// src/components/academic/EnrollmentList.js
import React, { useEffect, useState } from 'react';
import { mockData } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const EnrollmentList = () => {

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
        const response = await axios.get(`http://localhost:8080/api/courses/student/${studentId}`);
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
  const displayedCourses = schedule.slice(0, 2);
  return (
    <div className="section-card">
      <h2>Course Enrollment</h2>
      <div className="enrollment-list">
        {displayedCourses.map((course, i) => (
          <div key={i} className="enrollment-item">
            <div className="enrollment-header">
              <div className="enrollment-title">{course.title}</div>
              <div className="enrollment-credits">credits</div>
            </div>
            <div className="enrollment-details">
              <div className="enrollment-instructor">{course.lecturer}</div>
              <div className="enrollment-schedule">{course.day}</div>
              <div className="enrollment-schedule">{course.time}</div>
              <div className="enrollment-schedule">
                Room: {course.room}
              </div>
            </div>
            <button className={`btn-success`}>
              Enrolled
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentList;