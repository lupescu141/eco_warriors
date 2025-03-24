import AllPosts from "../components/AllPosts";
import "../styles/Posts.css";
import { mockdata } from "../mockdata/mockdata";

const MyPostsView = () => {
  return (
    <>
      <div
        className="posts-header-container
      "
      >
        <h1>My Posts</h1>
      </div>
      <hr style={{ width: "90vw", margin: "auto" }} />

      {mockdata.map(
        (post) =>
          // placeholder for mapping post by user
          post.user_id === 1 && <AllPosts key={post.post_id} mockdata={post} />
      )}
    </>
  );
};
export default MyPostsView;
