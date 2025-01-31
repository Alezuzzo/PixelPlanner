import { useState, useEffect } from 'react';
import '../styles/Component.css';
import ProgressBar from './ProgressBar';

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
}

function ContentProfile({ progress }: ContentProfileProps) {
  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='component-profile-div'>
      <button>PROFILE 1</button>
      <button>PROFILE 2</button>
      <p className='pQuote'>{currentQuote}</p>
      <ProgressBar progress={progress} />
    </div>
  );
}

export default ContentProfile;