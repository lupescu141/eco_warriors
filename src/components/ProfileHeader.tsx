import { ChangeEvent, useState } from "react";
import { useForm } from "../hooks/formHooks";
import { useImage } from "../hooks/apiHooks";

type profileProps = {
  user_name: string;
  user_score: number;
  user_level: number;
  profile_img: string;
  origin_img: string;
};

const ProfileHeader = ({
  user_name,
  user_score,
  user_level,
  profile_img,
  origin_img,
}: profileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { sendImage, newImage } = useImage();
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const initValues = {};

  const doFormSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!file || !token) return;
      const fileResult = await sendImage(file, origin_img, token);
      await newImage(fileResult, token);

      setFile(null);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const { handleSubmit } = useForm(doFormSubmit, initValues);
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
          <form action="" className="upload-form" onSubmit={handleSubmit}>
            <input
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
            />
            <button type="submit">Post</button>
          </form>
        </ul>
      </div>
      <hr></hr>
    </>
  );
};

export { ProfileHeader };
