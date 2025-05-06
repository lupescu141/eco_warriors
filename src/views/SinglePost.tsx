import { useLocation, useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Posts.css";
import {
  faArrowLeft,
  faCircleUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "../components/Comments";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";
import Likes from "../components/Likes";

const SinglePost = () => {
  const navigate: NavigateFunction = useNavigate();
  const { state } = useLocation();
  const item: MediaItemWithOwner = state.item;

  if (!item) {
    return <div>Error!</div>;
  }

  return (
    <>
      <div className="posts-header-container">
        <h1>Posts</h1>
        <h2>{item.post_title}</h2>
      </div>
      <hr style={{ width: "90vw", margin: "auto" }} />
      <div className="back-btn-container">
        <button className="go-back" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <div className="single-post-container">
        <img src={item.filename} alt={item.post_title}></img>
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

        {/*LIKES*/}
        <Likes item={item} />

        {/* COMMENTS */}
        <Comments
          item={item}
          deleteComment={(commentId) =>
            console.log(`Delete comment with ID: ${commentId}`)
          }
        />
      </div>
    </>
  );
};

export default SinglePost;
