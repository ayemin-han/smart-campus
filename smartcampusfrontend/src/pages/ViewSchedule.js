import api from '../api';
import { Clock, Home, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoHomeButton from '../Button/GoHomeButton';

const ViewSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Example: get studentId from localStorage or auth context
  const studentId = localStorage.getItem('studentId'); 

  useEffect(() => {
    const fetchStudentCourses = async () => {
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

    if (studentId) {
      fetchStudentCourses();
    } else {
      setError('Student not logged in.');
      setLoading(false);
    }
  }, [studentId]);

  if (loading) return <p>Loading schedule...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Schedule</h1>
        <p>View your registered courses and upcoming sessions.</p>
      </div>

      <div className="schedule-list">
        {schedule.map((item) => (
          <div key={item.courseCode} className="schedule-card">
            <div className="schedule-header">
              <h2>{item.title}</h2>
              <span className="schedule-code">{item.lecturer}</span>
            </div>
            <div className="schedule-details">
              <p><Clock size={16} /> {item.time}</p>
              <p><Home size={16} /> {item.room}</p>
              <p><Info size={16} /> {item.day}</p>
            </div>
          </div>
        ))}
      </div>

    <GoHomeButton />
    </div>
  );
};

export default ViewSchedule;
