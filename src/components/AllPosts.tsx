import { Link } from "react-router-dom";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";
import { usePost } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";

type itemProps = {
  item: MediaItemWithOwner;
  deleteMedia: (mediaId: number) => void;
};

const AllPosts = (props: itemProps) => {
  const { user } = useUserContext();
  const { item, deleteMedia } = props;
  const { deletePostbyID } = usePost();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return;
      }
      await deletePostbyID(item.post_id, token);
      console.log("Item deleted", item.post_id);
      deleteMedia(item.post_id);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <>
      {console.log(item)}
      <div key={item.post_id} className="all-posts-container">
        <div className="onePost-header">
          <h2>Posted by: {item.username}</h2>
          {/* käytä toLocaleDateString ku haluut pois kellon */}
          <p>{new Date(item.created_at).toLocaleString("fi-FI")}</p>
        </div>
        <div className="onePost-content">
          <img src={item.filename} alt={item.post_title}></img>
          <h2>{item.post_title}</h2>
          <p>{item.post_description}</p>

          <Link to="/single" className="link" state={{ item: item }}>
            Read more..
          </Link>

          <div className="tag-container">
            <span>Recycling</span>
            <span>Eco-friendly</span>
          </div>

          {/* DELETE */}
          {user && user.user_id === item.user_id && (
            <button onClick={handleDelete} className="reset">
              Delete
            </button>
          )}
        </div>
        <hr />
      </div>
    </>
  );
};

export default AllPosts;
