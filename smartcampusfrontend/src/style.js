// src/ui/Card.js
import React from "react";

export function Card({ children, style }) {
  return <div style={{ ...styles.card, ...style }}>{children}</div>;
}

export const styles = {
  app: { fontFamily: 'Inter, system-ui, -apple-system, Roboto, "Helvetica Neue", Arial', background: '#f4f5f6', minHeight: '100vh' },
  header: { background: '#A00000', color: '#fff', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16 },
  logo: { height: 40 },
  container: { display: 'flex' },
  sidebar: { width: 240, background: '#fff', borderRight: '1px solid #eee', padding: 20, minHeight: 'calc(100vh - 64px)' },
  navLink: { display: 'block', padding: '10px 12px', color: '#222', borderRadius: 8, textDecoration: 'none', marginBottom: 8 },
  activeNav: { background: '#feecec', color: '#A00000' },
  content: { flex: 1, padding: 24 },
  card: { background: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 16 },
  btn: { background: '#A00000', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' },
  outlineBtn: { background: 'transparent', color: '#A00000', border: '1px solid #A00000', padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }
};
