import { useState, useEffect } from 'react';
import './styles/App.css';
import ContentProfile from './components/ContentProfile';
import ContentInfo from './components/ContentInfo';
import badge1 from './assets/badge1.png';
import badge2 from './assets/badge2.png';
import badge3 from './assets/badge3.png';
import badge4 from './assets/badge4.png';
import badge5 from './assets/badge5.png';
import badge6 from './assets/badge6.png';
import badge7 from './assets/badge7.png';
import badge8 from './assets/badge8.png';
import badge9 from './assets/badge9.png';
import badge10 from './assets/badge10.png';

interface Task {
  id: string;
  text: string;
  done: boolean;
  category: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number | null>(null);
  const [weeklyGoal, setWeeklyGoal] = useState<number | null>(null);
  const [monthlyGoal, setMonthlyGoal] = useState<number | null>(null);
  const [selectedBadges, setSelectedBadges] = useState<(string | null)[]>(Array(6).fill(null));
  const [earnedBadges, setEarnedBadges] = useState<boolean[]>(Array(10).fill(false));
  const badges = [badge1, badge2, badge3, badge4, badge5, badge6, badge7, badge8, badge9, badge10];

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

  const handleSetGoal = (type: 'daily' | 'weekly' | 'monthly') => {
    const goal = prompt(`Set your ${type} goal for completed tasks:`);
    if (goal) {
      const parsedGoal = parseInt(goal, 10);
      if (type === 'daily') {
        setDailyGoal(parsedGoal);
      } else if (type === 'weekly') {
        setWeeklyGoal(parsedGoal);
      } else if (type === 'monthly') {
        setMonthlyGoal(parsedGoal);
      }
    }
  };

  const awardBadge = (index: number) => {
    const newEarnedBadges = [...earnedBadges];
    newEarnedBadges[index] = true;
    setEarnedBadges(newEarnedBadges);
  };

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.done).length;
    if (dailyGoal !== null && completedTasks >= dailyGoal) {
      awardBadge(0);
    }
    if (weeklyGoal !== null && completedTasks >= weeklyGoal) {
      awardBadge(1);
    }
    if (monthlyGoal !== null && completedTasks >= monthlyGoal) {
      awardBadge(2);
    }
  }, [tasks, dailyGoal, weeklyGoal, monthlyGoal]);

  const completedTasks = tasks.filter(task => task.done).length;
  const goalMessage = dailyGoal !== null
    ? completedTasks >= dailyGoal
      ? "Congratulations! You've met your daily goal."
      : `You need to complete ${dailyGoal - completedTasks} more tasks to meet your daily goal.`
    : weeklyGoal !== null
    ? completedTasks >= weeklyGoal
      ? "Congratulations! You've met your weekly goal."
      : `You need to complete ${weeklyGoal - completedTasks} more tasks to meet your weekly goal.`
    : monthlyGoal !== null
    ? completedTasks >= monthlyGoal
      ? "Congratulations! You've met your monthly goal."
      : `You need to complete ${monthlyGoal - completedTasks} more tasks to meet your monthly goal.`
    : "Set a goal to stay motivated!";

  return (
    <div className='app-container'>
      <ContentProfile 
        progress={calculateProgress()} 
        onSetGoal={handleSetGoal} 
        goalMessage={goalMessage}
        badges={badges}
        selectedBadges={selectedBadges}
        setSelectedBadges={setSelectedBadges}
        earnedBadges={earnedBadges}
      />
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