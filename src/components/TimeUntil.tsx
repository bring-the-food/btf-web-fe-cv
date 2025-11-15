import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface TimeUntilProps {
  targetTime: string;
}

const TimeUntil: React.FC<TimeUntilProps> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = moment.utc();
      const target = moment.utc(targetTime);
      const diffMinutes = target.diff(now, 'minutes');

      if (diffMinutes <= 0) {
        setTimeLeft('0 mins');
      } else if (diffMinutes < 60) {
        setTimeLeft(`${diffMinutes} mins`);
      } else {
        const hours = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        setTimeLeft(`${hours}h ${mins}m`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30 * 1000); // update every 30 seconds
    return () => clearInterval(interval);
  }, [targetTime]);

  return <span className="font-semibold text-[#FFC247]">{timeLeft}</span>;
};

export default TimeUntil;
