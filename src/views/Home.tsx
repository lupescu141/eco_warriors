import "./home.css";
import NewestPosts from "../components/NewestPosts";
import LoginRegisterPopup from "../components/LoginRegisterPopup";
import { useState } from "react";

const Home = () => {
  /* Modal state*/
  const [popupType, setPopupType] = useState<"login" | "register" | null>(null);
  /* Opens login modal */
  const handlePopupType = () => {
    setPopupType("register");
  };
  return (
    <>
      {" "}
      <div className="hero">
        <h1 className="home-title">
          Welcome to make the world a greener and cleaner place.
        </h1>
      </div>
      <div className="home-container">
        {/* Big Centered Header */}
        {/* <h1 className="home-title">
          Welcome to make the world a greener and cleaner place.
        </h1> */}

        {/* Smaller Left-Aligned Header and Paragraph */}
        <div className="home-content">
          <h2 className="home-subtitle">
            ECO Warriors – Join the Fight for a Greener Future!
          </h2>
          <p className="home-text">
            We are a community of people that share the love for our nature and
            its health. We want to give a place where people can share their
            deeds for a greener and cleaner world, like and comment each others
            posts and give each other advice on how to recycle and help the
            world.
          </p>
          <p className="home-text">
            ECO Warriors makes sustainability fun and engaging.
          </p>
          <ul>
            <li>
              <strong>📋 Complete Tasks</strong> – Choose from a list of monthly
              tasks, such as recycling, saving energy, or reducing waste. Share
              a photo or video as proof of completion.
            </li>
            <li>
              <strong>🏅 Earn Rewards</strong> – Gain points for completing
              tasks, unlock achievements, and customize your profile with unique
              badges and images.
            </li>
            <li>
              <strong>🌍 Join the Community</strong> – See what other users are
              doing, like and comment on their climate actions, and share your
              own progress.
            </li>
            <li>
              <strong>🎉 Participate in Events</strong> – Join group events
              where users work together to complete climate tasks and create a
              sense of community and collective action.
            </li>
          </ul>
          <p>
            ECO Warriors turns everyday climate actions into an exciting
            journey. Together, we can help build a more sustainable future, one
            task at a time.{" "}
          </p>
          <p id="join-now-text">
            <span id="join-now-span" onClick={handlePopupType}>
              Join now
            </span>{" "}
            and be a part of the change! 💚♻️
          </p>
        </div>

        {popupType && (
          <LoginRegisterPopup
            type={popupType}
            onClose={() => setPopupType(null)}
            onSwitch={() =>
              setPopupType(popupType === "login" ? "register" : "login")
            }
          />
        )}

        {/* Newest Posts - Row of Images */}
        <div className="newest-posts">
          <NewestPosts />
        </div>

        {/* Large Centered Image Placeholder */}
        <div className="large-image-placeholder"></div>
      </div>
    </>
  );
};

export default Home;
