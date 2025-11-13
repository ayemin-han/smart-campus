import React, { useState, useEffect } from 'react';
import api from '../../api';// Make sure your API instance is imported correctly
import { Card, styles } from '../../style';

// ---------- Announcements Page ----------
export default function AnnouncementsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/announcements');
      setItems(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const del = async (id) => {
    if (!window.confirm('Delete announcement?')) return;
    try {
      await api.delete(`/api/announcements/${id}`);
      load();
    } catch (e) {
      console.error(e);
      alert('Delete failed: ' + (e.response?.data || e.message));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h3>Announcements</h3>
        <button
          style={styles.btn}
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add Announcement
        </button>
      </div>

      <Card>
        {loading ? (
          'Loading...'
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
             <thead>
        <tr style={{ background: '#A00000', color: '#fff' }}>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Category</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Date</th>
          <th style={{ padding: '8px 12px', textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
            <tbody>
              {items.map((a) => (
                    <tr key={a.announcementId} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '8px 12px' }}>{a.name}</td>
            <td style={{ padding: '8px 12px' }}>{a.category}</td>
            <td style={{ padding: '8px 12px' }}>{a.date}</td>
            <td style={{ padding: '8px 12px', textAlign: 'center' }}>
              <button
                style={{ ...styles.outlineBtn, marginRight: 8 }}
                onClick={() => {
                  setEditing(a);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                style={{ ...styles.outlineBtn, background: '#fff', color: '#A00000' }}
                onClick={() => del(a.announcementId)}
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

      {showForm && <AnnouncementForm initial={editing} onClose={() => { setShowForm(false); load(); }} />}
    </div>
  );
}

// ---------- Announcement Form ----------
function AnnouncementForm({ initial, onClose }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState({
    name: initial?.name || '',
    content: initial?.content || '',
    category: initial?.category || '',
    date: initial?.date || '',
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const adminId = JSON.parse(localStorage.getItem('adminId'));
      if (!adminId) {
        alert('Admin ID not found — please log in again.');
        return;
      }

      const payload = { ...form, admin: { adminId } };
      if (isEdit) {
        await api.put(`/api/announcements/${initial.announcementId}`, form);
      } else {
        await api.post('/api/announcements', payload);
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
            <h4>{isEdit ? 'Edit' : 'Add'} Announcement</h4>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18 }}>✕</button>
          </div>

          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
            <textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={6}
              required
            />
            <input
              type="date"
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
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
