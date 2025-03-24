import { mockdata } from "../mockdata/mockdata";

const NewestPosts = () => {
  // Lajittele mockdata created_at-kentän perusteella
  const sortedMockdata = [...mockdata].sort(
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
            <img
              src={
                "https://placehold.co/200x100@2x/light-grey/white/png?text=IMG"
              }
              alt={post.title}
            ></img>
            <div className="text-container">
              <h4>{post.title}</h4>
              <p>{post.username}</p>
              <p>{post.created_at}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewestPosts;
