import { Link } from "react-router-dom";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";
// import { Post } from "../mockdata/mockdata";

type MockdataProps = {
  mockdata: MediaItemWithOwner;
};

const AllPosts = ({ mockdata }: MockdataProps) => {
  return (
    <>
      {console.log(mockdata)}
      <div key={mockdata.post_id} className="all-posts-container">
        <div className="onePost-header">
          <h2>Posted by: {mockdata.username}</h2>
          {/* käytä toLocaleDateString ku haluut pois kellon */}
          <p>{new Date(mockdata.created_at).toLocaleString("fi-FI")}</p>
        </div>
        <div className="onePost-content">
          <img
            src={
              "https://placehold.co/300x200@2x/light-grey/white/png?text=IMG"
            }
            alt={mockdata.post_title}
          ></img>
          <h2>{mockdata.post_title}</h2>
          <p>{mockdata.post_description}</p>
          <Link to="/single" className="link" state={{ item: mockdata }}>
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
