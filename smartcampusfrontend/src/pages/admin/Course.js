import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Card, styles } from '../../style';


export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load courses');
    }
    setLoading(false);
  };

  const deleteCourse = async (courseCode) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.delete(`/api/courses/${courseCode}`);
      loadCourses();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h3>Courses</h3>
        <button
          style={styles.btn}
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add Course
        </button>
      </div>

      <Card>
        {loading ? (
          'Loading...'
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
        <tr style={{ background: '#A00000', color: '#fff' }}>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Course Code</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Title</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Room</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Day</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Time</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Lecturer</th>
          <th style={{ padding: '8px 12px', textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
           <tbody>
        {courses.map((c) => (
          <tr key={c.courseCode} style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ padding: '8px 12px' }}>{c.courseCode}</td>
            <td style={{ padding: '8px 12px' }}>{c.title}</td>
            <td style={{ padding: '8px 12px' }}>{c.room}</td>
            <td style={{ padding: '8px 12px' }}>{c.day}</td>
            <td style={{ padding: '8px 12px' }}>{c.time}</td>
            <td style={{ padding: '8px 12px' }}>{c.lecturer}</td>
            <td style={{ padding: '8px 12px', textAlign: 'center' }}>
              <button
                style={{ ...styles.outlineBtn, marginRight: 8 }}
                onClick={() => {
                  setEditing(c);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                style={{ ...styles.outlineBtn, background: '#fff', color: '#A00000' }}
                onClick={() => deleteCourse(c.courseCode)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
          </table>
        )}
      </Card>

      {showForm && <CourseForm initial={editing} onClose={() => { setShowForm(false); loadCourses(); }} />}
    </div>
  );
}

// ---------- Course Form ----------
function CourseForm({ initial, onClose }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState({
    courseCode: initial?.courseCode || '',
    title: initial?.title || '',
    room: initial?.room || '',
    day: initial?.day || '',
    time: initial?.time || '',
    lecturer: initial?.lecturer || '',
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/api/courses/${initial.courseCode}`, form);
      } else {
        await api.post('/api/courses', form);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Save failed: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{ width: 600 }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>{isEdit ? 'Edit' : 'Add'} Course</h4>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18 }}>✕</button>
          </div>

          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            {!isEdit && (
              <input
                placeholder="Course Code"
                value={form.courseCode}
                onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
                required
              />
            )}
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              placeholder="Room"
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
              required
            />
            <input
              placeholder="Day"
              value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}
              required
            />
            <input
              placeholder="Time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
            />
            <input
              placeholder="Lecturer"
              value={form.lecturer}
              onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" onClick={onClose} style={{ ...styles.outlineBtn }}>Cancel</button>
              <button type="submit" style={styles.btn}>Save</button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
