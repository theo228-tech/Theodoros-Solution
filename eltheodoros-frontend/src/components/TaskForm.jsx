/*import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input 
        type="text" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Nouvelle tâche"
        style={{ padding: 5, width: 200 }}
      />
      <button type="submit" style={{ marginLeft: 10 }}>Ajouter</button>
    </form>
  );
}
*/

import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, completed: false });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
        style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          padding: '8px 15px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Ajouter
      </button>
    </form>
  );
}
