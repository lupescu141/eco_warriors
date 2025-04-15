import { useLocation, useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Posts.css";
import { faCircleUser, faClock } from "@fortawesome/free-solid-svg-icons";
import Comments from "../components/Comments";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";

const SinglePost = () => {
  const navigate: NavigateFunction = useNavigate();
  const { state } = useLocation();
  const item: MediaItemWithOwner = state.item;

  // console.log("löytyykä", item);
  if (!item) {
    return <div>Error!</div>;
  }

  return (
    <>
      <div className="posts-header-container">
        <h1>Posts</h1>
        <h2>{item.post_title}</h2>
      </div>
      <hr style={{ width: "90vw", margin: "auto", backgroundColor: "red" }} />
      <div className="single-post-container">
        <img
          src={"https://placehold.co/300x200@2x/light-grey/white/png?text=IMG"}
        ></img>
        <h2>{item.post_title}</h2>
        <div className="datetime-user-container">
          <div className="datetime-user">
            <FontAwesomeIcon icon={faCircleUser} className="icon" />{" "}
            {item.username}
          </div>
          <div className="datetime-user">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <p>{new Date(item.created_at).toLocaleString("fi-FI")}</p>
          </div>
        </div>
        <p>{item.post_description}</p>

        {/* TAGS */}
        <div className="tag-container">
          <span>Recycling</span>
          <span>Eco-friendly</span>
        </div>

        <button onClick={() => navigate(-1)}>Go back</button>

        {/* COMMENTS */}
        <Comments />
      </div>
    </>
  );
};

export default SinglePost;
