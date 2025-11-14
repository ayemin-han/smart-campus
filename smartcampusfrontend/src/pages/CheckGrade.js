import React, { useEffect, useState } from 'react';
import api from '../api';
import { Award, BookOpen, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GoHomeButton from '../Button/GoHomeButton';
import { mockData } from '../data/mockData';

const CheckGrades = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const studentId = localStorage.getItem('studentId'); // or however you're storing it

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await api.get(`/courses/student/${studentId}`);
        console.log('Fetched courses:', response.data);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load schedule.');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchStudentCourses();
    else {
      setError('Student not logged in.');
      setLoading(false);
    }
  }, [studentId]);

  if (loading) return <p>Loading schedule...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Check Grades</h1>
        <p>View your registered courses and performance summary.</p>
      </div>

      <div className="grades-table">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
              <th>Credits</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => {
                // match backend name with mockData
                const courseName =
                  course.courseName || course.name || course.title || course.course;
                return (
                  <tr key={index}>
                    <td><BookOpen size={14} /> {courseName}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      -
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">No registered courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <Award size={22} />
          <h3>GPA</h3>
          <p>-</p>
        </div>
        <div className="summary-card">
          <TrendingUp size={22} />
          <h3>Total Credits</h3>
          <p>-</p>
        </div>
      </div>

      <GoHomeButton />
    </div>
  );
};

export default CheckGrades;