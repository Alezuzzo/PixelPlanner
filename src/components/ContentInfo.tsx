import React, { useState } from 'react';
import '../styles/Component.css';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  text: string;
  done: boolean;
  category: string;
}

interface ContentInfoProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  markTaskDone: (id: string) => void;
  deleteTask: (id: string) => void;
}

function ContentInfo({ tasks, addTask, markTaskDone, deleteTask }: ContentInfoProps) {
  const [newTask, setNewTask] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentView, setCurrentView] = useState<string>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() && selectedCategory) {
      addTask({ id: uuidv4(), text: newTask, done: false, category: selectedCategory });
      setNewTask('');
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const renderTasks = (category: string) => (
    <ul>
      {tasks.filter(task => category === 'all' || task.category === category).map((task) => (
        <li key={task.id}>
          {task.done && <span>✔️ </span>}
          <span className={task.done ? 'done' : ''}>{task.text}</span>
          <button onClick={() => markTaskDone(task.id)}>Done</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className='content-info-div'>
      <div className='view-buttons'>
        <button onClick={() => setCurrentView('all')}>All Tasks</button>
        {categories.map((category, index) => (
          <button key={index} onClick={() => setCurrentView(category)}>{category}</button>
        ))}
      </div>
      <form onSubmit={handleAddCategory} className='form-category'>
        <input 
          type="text" 
          placeholder='Add new category' 
          className='input-category' 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)} 
        />
        <button type="submit">Add Category</button>
      </form>
      <form onSubmit={handleAddTask} className='form-task'>
        <input 
          type="text" 
          placeholder='Type your task' 
          className='input-task' 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className='select-category'
        >
          <option value="">Select category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
      <div className='tasks-container'>
        {currentView === 'all' ? (
          <div className='category-tasks'>
            <h3>All Tasks</h3>
            {renderTasks('all')}
          </div>
        ) : (
          <div className='category-tasks'>
            <h3>{currentView}</h3>
            {renderTasks(currentView)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentInfo;