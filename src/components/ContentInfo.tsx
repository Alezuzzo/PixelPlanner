import { useState } from 'react';
import '../styles/Component.css'

function ContentInfo() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if(newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  

  return (
    <div className='content-info-div'>
        <form action="" className='form-task'>
            <input type="" placeholder='Type your task' className='input-task'/>
            <button>Add Task</button>
        </form>
    </div>
  )
}

export default ContentInfo