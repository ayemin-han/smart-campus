import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Card, styles } from '../../style';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load users');
    }
    setLoading(false);
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div>
      {/* Header + Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h3>Users</h3>
        <button
          style={styles.btn}
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <Card>
        {loading ? (
          'Loading...'
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#A00000', color: '#fff' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>User ID</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Username</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Password</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Admin</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '8px 12px' }}>{u.userId}</td>
                  <td style={{ padding: '8px 12px' }}>{u.username}</td>
                  <td style={{ padding: '8px 12px' }}>{u.password}</td>
                  <td style={{ padding: '8px 12px' }}>{u.admin ? 'Yes' : 'No'}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    <button
                      style={{ ...styles.outlineBtn, marginRight: 8 }}
                      onClick={() => {
                        setEditing(u);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.outlineBtn, background: '#fff', color: '#A00000' }}
                      onClick={() => deleteUser(u.userId)}
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

      {/* Form Modal */}
      {showForm && <UserForm initial={editing} onClose={() => { setShowForm(false); loadUsers(); }} />}
    </div>
  );
}

// ---------- User Form ----------
function UserForm({ initial, onClose }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState({
    username: initial?.username || '',
    password: initial?.password || '',
    admin: initial?.admin || false,
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/users/${initial.userId}`, form);
      } else {
        await api.post('/users', form);
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
      <div style={{ width: 500 }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>{isEdit ? 'Edit' : 'Add'} User</h4>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18 }}>✕</button>
          </div>

          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={form.admin}
                onChange={(e) => setForm({ ...form, admin: e.target.checked })}
              />
              Is Admin
            </label>

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
