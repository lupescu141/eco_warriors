import { useLocation, useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Posts.css";
import { faCircleUser, faClock } from "@fortawesome/free-solid-svg-icons";
import Comments from "../components/Comments";
import { Post } from "../mockdata/mockdata";

const SinglePost = () => {
  const location = useLocation();
  const { item }: { item: Post } = location.state || {};
  const navigate: NavigateFunction = useNavigate();

  console.log("löytyykä", item);
  if (!item) {
    return <div>Error!</div>;
  }

  return (
    <>
      <div className="posts-header-container">
        <h1>Posts</h1>
        <h2>{item.title}</h2>
        {/* {item.title} */}
      </div>
      <hr style={{ width: "90vw", margin: "auto", backgroundColor: "red" }} />
      <div className="single-post-container">
        <img
          src={"https://placehold.co/300x200@2x/light-grey/white/png?text=IMG"}
        ></img>
        <h2>{item.title}</h2>
        <div className="datetime-user-container">
          <div className="datetime-user">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <p>{item.created_at}</p>
          </div>
          <div className="datetime-user">
            <FontAwesomeIcon icon={faCircleUser} className="icon" />{" "}
            {item.username}
          </div>
        </div>
        <p>{item.description}</p>

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
