import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, styles} from '../style';
// Replace with your actual login URL
const AUTH_LOGIN_URL = 'https://smart-campus-10.onrender.com/api/auth/login';


export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const res = await axios.post(AUTH_LOGIN_URL, { username, password });
      console.log()
       const { token, admin, adminId, user } = res.data;

      if (!token) throw new Error('Invalid login response from server');

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      if (adminId) localStorage.setItem('adminId', adminId);
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      onLoginSuccess(admin);

      if (!admin) {
      const studentId = user?.student?.studentId; // <---- ✅ extract from nested object
      const studentName = user?.student?.name;
       if (studentName) {
        localStorage.setItem('studentName', studentName);
      } else {
        console.warn("Student Name not found in user object.");
      }

      if (studentId) {
        localStorage.setItem('studentId', studentId);
      } else {
        console.warn("Student ID not found in user object.");
      }
    }
      // Redirect based on role
      if (admin) {
        navigate('/admin');  // AdminDashboard route
      } else {
        navigate('/dashboard'); // Regular user dashboard route
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f5f5f5'
    }}>
      <div style={{ width: 420 }}>
        <Card>
          <h3 style={{ marginBottom: 16, textAlign: 'center' }}>Login</h3>
          <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
              autoFocus
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
            />
            {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
            <button type="submit" style={styles.btn}>Sign In</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
