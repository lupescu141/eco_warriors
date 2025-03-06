import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Big Centered Header */}
      <h1 className="home-title">Lorem Ipsum</h1>

      {/* Smaller Left-Aligned Header and Paragraph */}
      <div className="home-content">
        <h2 className="home-subtitle">Lorem Ipsum</h2>
        <p className="home-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Newest Posts - Row of Images */}
      <div className="newest-posts">
        <h3>Newest Posts</h3>
        <div className="image-row">
          <div className="image-placeholder"></div>
          <div className="image-placeholder"></div>
          <div className="image-placeholder"></div>
        </div>
      </div>

      {/* Large Centered Image Placeholder */}
      <div className="large-image-placeholder"></div>
    </div>
  );
};

export default Home;
