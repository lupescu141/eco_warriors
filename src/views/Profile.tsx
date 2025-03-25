import React from "react";
import "./profile.css";
import { ProfileHeader } from "../components/ProfileHeader";

const Profile = () => {
  return (
    <>
      <div className="main_container">
        <ProfileHeader
          user_name="mika häkkinen"
          user_level={2}
          user_score={2000}
          profile_img=""
        ></ProfileHeader>
        <div className="information_container"></div>
      </div>
    </>
  );
};

export { Profile };
