import { Link } from "react-router-dom";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";

type postProps = {
  post: MediaItemWithOwner;
};

const AllPosts = ({ post }: postProps) => {
  return (
    <>
      {console.log(post)}
      <div key={post.post_id} className="all-posts-container">
        <div className="onePost-header">
          <h2>Posted by: {post.username}</h2>
          {/* käytä toLocaleDateString ku haluut pois kellon */}
          <p>{new Date(post.created_at).toLocaleString("fi-FI")}</p>
        </div>
        <div className="onePost-content">
          <img src={post.filename} alt={post.post_title}></img>
          <h2>{post.post_title}</h2>
          <p>{post.post_description}</p>
          <Link to="/single" className="link" state={{ item: post }}>
            Read more..
          </Link>
          <div className="tag-container">
            <span>Recycling</span>
            <span>Eco-friendly</span>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default AllPosts;
