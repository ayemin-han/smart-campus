import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const ScheduleList = () => {
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
  const displayedCourses = schedule.slice(0, 3);

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Today's Schedule</h2>
        <span className="section-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
      </div>

      <div className="schedule-list">
        {displayedCourses.map((item) => (
          <div key={item.courseCode} className={`schedule-item ${item.status || 'upcoming'}`}>
            <div className="schedule-indicator"></div>
            <div className="schedule-content">
              <div className="schedule-title">{item.title}</div>
              <div className="schedule-details">
                {item.lecturer} • {item.room}
              </div>
            </div>
            <div className="schedule-time">
              <div className="time-value">{item.time}</div>
              <div className={`status-badge ${item.status || 'upcoming'}`}>
                {item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn-secondary full-width"
        onClick={() => navigate('/schedule')}
      >
        View Full Schedule
      </button>
    </div>
  );
};

export default ScheduleList;
