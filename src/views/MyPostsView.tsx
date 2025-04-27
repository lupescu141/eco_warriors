import AllPosts from "../components/AllPosts";
// import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";
import "../styles/Posts.css";
// import { useState } from "react";
import { usePost } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";

const MyPostsView = () => {
  // const [SelectedItem, setSelectedItem] = useState<
  //   MediaItemWithOwner | undefined
  // >(undefined);
  // console.log(SelectedItem);

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

      {postArray.map(
        (post) =>
          user &&
          user.user_id === post.user_id && (
            <AllPosts key={post.post_id} mockdata={post} />
          )
      )}
    </>
  );
};
export default MyPostsView;
