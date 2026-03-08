import React, { useState } from 'react';

export default function TaskItem({ task, onUpdate, onDelete, onToggleCompleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (!newTitle.trim()) return;
    onUpdate({ ...task, title: newTitle });
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Titre ou édition */}
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            flex: 1,
          }}
        >
          {task.title}
        </span>
      )}

      {/* Boutons */}
      <div style={{ display: 'flex', gap: 5 }}>
        {/* Modifier / Sauvegarder */}
        {isEditing ? (
          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Sauvegarder
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Modifier
          </button>
        )}

        {/* Terminer / Revenir */}
        <button
          onClick={() => onToggleCompleted(task)}
          style={{
            backgroundColor: task.completed ? '#9E9E9E' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '6px 12px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {task.completed ? 'À faire' : 'Terminer'}
        </button>

        {/* Supprimer */}
        <button
          onClick={() => onDelete(task)}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '6px 12px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}
