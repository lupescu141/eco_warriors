import AllPosts from "../components/AllPosts";
import "../styles/Posts.css";

type Post = {
  post_id: number;
  username: string;
  title: string;
  description: string;
  post_image: string;
  created_at: string;
};

const mockdata: Post[] = [
  {
    post_id: 1,
    username: "Mart77",
    title: "Why to recycle",
    description: "lorem",
    post_image: "kuva.jpg",
    created_at: "10:30 20.2.2025",
  },
  {
    post_id: 2,
    username: "Pekka",
    title: "Biowaste",
    description: "How to reduce biowaste?",
    post_image: "kuva.jpg",
    created_at: "16:0 1.2.2025",
  },
];

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

      <AllPosts mockdata={mockdata} />
    </>
  );
};
export default Posts;
