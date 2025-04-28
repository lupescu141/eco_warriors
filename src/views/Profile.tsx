import React from "react";
import "./profile.css";
import { ProfileHeader } from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";
import { useUserContext } from "../hooks/contextHooks";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <>
      <div className="main_container">
        <ProfileHeader
          user_name={`${user?.username}`}
          user_level={2}
          user_score={2000}
          profile_img={`http://localhost:3001/api/users/profile-picture/${user?.user_id}`}
        ></ProfileHeader>
        <ProfileForm
          email={`${user?.email}`}
          username={`${user?.username}`}
        ></ProfileForm>
        <div className="information_container"></div>
      </div>
    </>
  );
};

export { Profile };
