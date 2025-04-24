import { Link } from "react-router-dom";
import { usePost } from "../hooks/apiHooks";

const NewestPosts = () => {
  const { postArray } = usePost();

  // Lajittele mockdata created_at-kentän perusteella
  const sortedMockdata = [...postArray].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Ota kolme uusinta postausta
  const newestPosts = sortedMockdata.slice(0, 3);

  return (
    <>
      <h2 className="nph">Newest Posts</h2>
      <div className="newest-post-container">
        {newestPosts.map((post) => (
          <div key={post.post_id} className="card-container">
            <Link to="/single" className="np-link" state={{ item: post }}>
              <img src={post.filename} alt={post.post_title}></img>
              <div className="text-container">
                <h4>{post.post_title}</h4>
                <p>{post.username}</p>
                <p>{new Date(post.created_at).toLocaleString("fi-FI")}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewestPosts;
