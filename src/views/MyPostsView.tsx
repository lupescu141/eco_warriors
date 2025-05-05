import AllPosts from "../components/AllPosts";
import "../styles/Posts.css";
import { usePost } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";

const MyPostsView = () => {
  const { postArray } = usePost();
  const { user } = useUserContext();

  return (
    <>
      <div
        className="posts-header-container
      "
      >
        <h1>My Posts</h1>
      </div>
      <hr style={{ width: "90vw", margin: "auto" }} />


      {[...postArray]
        .reverse()
        .map(
          (post) =>
            user &&
            user.user_id === post.user_id && (
              <AllPosts key={post.post_id} post={post}deleteMedia={() => {}}  />
            )
        )}

    </>
  );
};
export default MyPostsView;
