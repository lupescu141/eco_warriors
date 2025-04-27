import React from "react";
import "./profile.css";
import { ProfileHeader } from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";

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
        <ProfileForm></ProfileForm>
        <div className="information_container"></div>
      </div>
    </>
  );
};

export { Profile };
