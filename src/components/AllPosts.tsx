import { Link } from "react-router-dom";

type Post = {
  post_id: number;
  username: string;
  title: string;
  description: string;
  post_image: string;
  created_at: string;
};
type MockdataProps = {
  mockdata: Post;
};

const AllPosts = ({ mockdata }: MockdataProps) => {
  return (
    <>
      <div key={mockdata.post_id} className="all-posts-container">
        <div className="onePost-header">
          <h2>Posted by: {mockdata.username}</h2>
          <p>{mockdata.created_at}</p>
        </div>
        <div className="onePost-content">
          <img
            src={
              "https://placehold.co/300x200@2x/light-grey/white/png?text=IMG"
            }
            alt={mockdata.title}
          ></img>
          <h2>{mockdata.title}</h2>
          <p>
            {mockdata.description} + Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Doloremque sed recusandae voluptatum magni quasi
            ea, sunt numquam et eligendi quaerat, ipsam atque sequi. Incidunt
            vel aut possimus ullam animi commodi?
          </p>
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
