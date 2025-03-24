import AllPosts from "../components/AllPosts";
import { mockdata } from "../mockdata/mockdata";
import "../styles/Posts.css";

const Posts = () => {
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

      {mockdata.map((post) => (
        <AllPosts key={post.post_id} mockdata={post} />
      ))}
    </>
  );
};
export default Posts;
