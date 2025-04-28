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
    <>
      <div className="profile_header">
        <ul className="profile_header_left">
          <li>
            <h1>Profile</h1>
          </li>
        </ul>
        <ul className="profile_header_right">
          <li>
            <img
              src={
                profile_img
                  ? profile_img
                  : "src/mockup_delete_on_build/shrek.jpg"
              }
              alt="Profile image"
            />
            <p className="user_name"> {user_name ? user_name : "user-name"}</p>
            <div className="profile_header_userinfo">
              <p>Level: {user_level}</p>
              <p>Scrore: {user_score}</p>
            </div>
          </li>
        </ul>
      </div>
      <hr></hr>
    </>
  );
};

export { ProfileHeader };
