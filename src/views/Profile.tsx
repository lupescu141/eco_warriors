import { useEffect, useState } from "react";
import "./profile.css";
import { ProfileHeader } from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";
import { useUserContext } from "../hooks/contextHooks";
import { useImage } from "../hooks/apiHooks";
import { Pfresposne } from "ecwtypes/MessageTypes";

const Profile = () => {
  const { user } = useUserContext();
  const { getProfileImage } = useImage();
  const [imageItem, setImage] = useState<Pfresposne>({
    origin: "default",
    filename: "default",
    message: "default",
  });

  useEffect(() => {
    const getImage = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const image = await getProfileImage(token);
      if (!image) return;
      setImage(image);
    };
    getImage();
  }, []);

  return (
    <>
      <div className="main_container">
        <ProfileHeader
          user_name={`${user?.username}`}
          user_level={2}
          user_score={2000}
          profile_img={imageItem.filename}
          origin_img={imageItem.origin}
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
