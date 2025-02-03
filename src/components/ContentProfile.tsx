import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import BadgeSelectionModal from './BadgeSelectionModal';
import PomodoroTimer from './PomodoroTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';

const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "Don’t let yesterday take up too much of today.",
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.",
  "People who are crazy enough to think they can change the world, are the ones who do.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That’s the classic entrepreneur.",
  "We may encounter many defeats but we must not be defeated."
];

interface ContentProfileProps {
  progress: number;
  onSetGoal: (type: 'daily' | 'weekly' | 'monthly') => void;
  goalMessage: string;
  badges: string[]; // Array of badge image URLs or names
  selectedBadges: (string | null)[];
  setSelectedBadges: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  earnedBadges: boolean[];
}

function ContentProfile({ progress, onSetGoal, goalMessage, badges, selectedBadges, setSelectedBadges, earnedBadges }: ContentProfileProps) {
  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);
  const [selectedGoalType, setSelectedGoalType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState<boolean>(false);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState<number | null>(null);

  const handleBadgeClick = (index: number) => {
    if (earnedBadges[index]) {
      setCurrentBadgeIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleSelectBadge = (badge: string) => {
    if (currentBadgeIndex !== null) {
      const newSelectedBadges = [...selectedBadges];
      newSelectedBadges[currentBadgeIndex] = badge;
      setSelectedBadges(newSelectedBadges);
      setCurrentBadgeIndex(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const earnedBadgesList = badges.filter((_, index) => earnedBadges[index]);

  return (
    <div className='component-profile-div'>
      <div className='badges-section'>
        {selectedBadges.map((badge, index) => (
          <div key={index} className='badge-square' onClick={() => handleBadgeClick(index)}>
            {badge ? <img src={badge} alt={`Badge ${index + 1}`} className='badge-image' /> : <div className='empty-badge'>+</div>}
          </div>
        ))}
      </div>
      <div className='goal-setting'>
        <button className='button-pomodoro' onClick={() => setIsPomodoroOpen(true)}>
          <FontAwesomeIcon icon={faAppleAlt} />
        </button>
        <select className='select-goal' value={selectedGoalType} onChange={(e) => setSelectedGoalType(e.target.value as 'daily' | 'weekly' | 'monthly')}>
          <option value='daily'>Daily Goal</option>
          <option value='weekly'>Weekly Goal</option>
          <option value='monthly'>Monthly Goal</option>
        </select>
        <button className='button-goal' onClick={() => onSetGoal(selectedGoalType)}>Set Goal</button>
      </div>
      <p className='pQuote'>{currentQuote}</p>
      <p>{goalMessage}</p>
      <ProgressBar progress={progress} />
      {isModalOpen && (
        <BadgeSelectionModal
          badges={earnedBadgesList}
          onSelectBadge={handleSelectBadge}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isPomodoroOpen && (
        <PomodoroTimer onClose={() => setIsPomodoroOpen(false)} />
      )}
    </div>
  );
}

export default ContentProfile;