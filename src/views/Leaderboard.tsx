import React from 'react';
import Carousel from '../components/Carousel';
import { useTop100, useTop10 } from '../hooks/apiHooks';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
    const { top10, loading: loadingTop10 } = useTop10();
    const { top100, loading: loadingTop100 } = useTop100();
  
    return (
      <div className="leaderboard-container">
        <h1 className="main-header">Leaderboard</h1>
        <h2 className="top10-header">Top 10 of last year</h2>
  
        {loadingTop10 ? (
          <p>Loading top 10...</p>
        ) : (
          <Carousel players={top10} />
        )}
  
        <h2 className="top100-header">Live leaderboard</h2>
        <div className="top100-list">
          {loadingTop100 ? (
            <p>Loading top 100...</p>
          ) : (
            top100.map((player, index) => (
              <div className="player-row" key={player.id}>
                <span className="rank">{index + 1}.</span>
                <span className="name">{player.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default Leaderboard;