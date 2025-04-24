import React, { useState } from 'react';
import '../styles/Leaderboard.css';

interface Player {
  id: number;
  name: string;
  avatar: string;
}

const Carousel = ({ players }: { players: Player[] }) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? players.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === players.length - 1 ? 0 : prev + 1));

  return (
    <div className="carousel-container">
      <button className="nav-button" id="prev-button" onClick={handlePrev}>
        &#8249;
      </button>

      <div className="carousel-wrapper" style={{ transform: `translateX(-${current * 100}%)` }}>
        {players.map((player) => (
          <div className="carousel-card" key={player.id}>
            <div className="laurel-wrapper">
              <img src="/laurel.png" alt="Laurel" className="laurel" />
              <img src={player.avatar} alt={player.name} className="avatar" />
            </div>
            <h3>{player.name}</h3>
          </div>
        ))}
      </div>

      <button className="nav-button" id="next-button" onClick={handleNext}>
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
