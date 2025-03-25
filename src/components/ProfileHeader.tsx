import React from "react";

type profileProps = {
  user_name: string;
  user_score: number;
  user_level: number;
  profile_img: string;
};

const ProfileHeader = ({
  user_name,
  user_score,
  user_level,
  profile_img,
}: profileProps) => {
  return (
    <div className="profile_header">
      <ul>
        <li>
          <h1>Profile</h1>
        </li>
        <li>
          <p className="user_name"> {user_name ? user_name : "user-name"}</p>
          <img src={profile_img ? profile_img : "mockup"} alt="Profile image" />
          <p>Level: {user_level}</p>
          <p>Scrore: {user_score}</p>
        </li>
      </ul>
    </div>
  );
};

export { ProfileHeader };
