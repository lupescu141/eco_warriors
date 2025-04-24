import React from 'react';
import Carousel from '../components/Carousel';
import '../styles/Leaderboard.css';

const dummyTop10 = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Player ${i + 1}`,
  avatar: `https://via.placeholder.com/100?text=P${i + 1}`,
}));

const dummyTop100 = Array.from({ length: 90 }, (_, i) => ({
  id: i + 11,
  name: `Player ${i + 11}`,
}));

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <h1 className="main-header">Leaderboard</h1>
      <h2 className="top10-header">TOP 10</h2>

      <Carousel players={dummyTop10} />

      <div className="top100-list">
        {dummyTop100.map((player) => (
          <div className="player-row" key={player.id}>
            <span className="rank">{player.id}.</span>
            <span className="name">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
