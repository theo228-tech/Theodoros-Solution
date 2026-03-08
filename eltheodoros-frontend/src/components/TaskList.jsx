import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onUpdate, onDelete, onToggleCompleted }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id || task.title}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </ul>
  );
}
