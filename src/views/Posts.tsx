import AllPosts from "../components/AllPosts";
import { usePost } from "../hooks/apiHooks";
import "../styles/Posts.css";
import { useEffect, useState } from "react";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";

const Posts = () => {
  const [postItems, setPostItems] = useState<MediaItemWithOwner[]>([]);

  const { postArray } = usePost();

  const handleDelete = (postId: number) => {
    setPostItems((prevItems) =>
      prevItems.filter((item) => item.post_id !== postId)
    );
  };

  useEffect(() => {
    setPostItems(postArray);
  }, [postArray]);

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
        <AllPosts key={post.post_id} item={post} deleteMedia={handleDelete} />
      ))}
    </>
  );
};
export default Posts;
