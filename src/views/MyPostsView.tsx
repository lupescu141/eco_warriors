import AllPosts from "../components/AllPosts";
import "../styles/Posts.css";

type Post = {
  post_id: number;
  username: string;
  title: string;
  description: string;
  post_image: string;
  created_at: string;
  user_id: number;
};

const mockdata: Post[] = [
  {
    post_id: 1,
    username: "Mart77",
    title: "Why to recycle",
    description: "lorem",
    post_image: "kuva.jpg",
    created_at: "10:30 20.2.2025",
    user_id: 1,
  },
  {
    post_id: 2,
    username: "Pekka",
    title: "Biowaste",
    description: "How to reduce biowaste?",
    post_image: "kuva.jpg",
    created_at: "16:0 1.2.2025",
    user_id: 2,
  },
  {
    post_id: 3,
    username: "Mart77",
    title: "Plastic waste is bad!",
    description: "lorem",
    post_image: "kuva.jpg",
    created_at: "10:30 20.2.2025",
    user_id: 1,
  },
];

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
