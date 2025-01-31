import { useState } from 'react';
import './styles/App.css';
import ContentProfile from './components/ContentProfile';
import ContentInfo from './components/ContentInfo';

interface Task {
  id: string;
  text: string;
  done: boolean;
  category: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const markTaskDone = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, done: true } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const calculateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.done).length;
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };

  return (
    <div className='app-container'>
      <ContentProfile progress={calculateProgress()} />
      <ContentInfo 
        tasks={tasks} 
        addTask={addTask} 
        markTaskDone={markTaskDone} 
        deleteTask={deleteTask} 
      />
    </div>
  );
}

export default App;