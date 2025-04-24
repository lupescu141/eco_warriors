import AllPosts from "../components/AllPosts";
import { usePost } from "../hooks/apiHooks";
import "../styles/Posts.css";
import { useEffect, useState } from "react";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";

const Posts = () => {
  const [postItems, setPostItems] = useState<MediaItemWithOwner[]>([]);

  const { postArray } = usePost();

  useEffect(() => {
    setPostItems(postArray);
  }, [postArray]);

  // console.log("media itemit:", postItems);

  return (
    <>
      <div
        className="posts-header-container
      "
      >
        <h1>Posts</h1>
        <div>Searchbar placeholder</div>
      </div>
      <hr style={{ width: "90vw", margin: "auto" }} />

      {[...postItems].reverse().map((post) => (
        <AllPosts key={post.post_id} post={post} />
      ))}
    </>
  );
};
export default Posts;
