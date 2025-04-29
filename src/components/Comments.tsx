type Comment = {
  comment_id: number;
  post_id: number;
  username: string;
  comment_text: string;
  created_at: number;
};

const comments: Comment[] = [
  {
    comment_id: 1,
    post_id: 2,
    username: "Matti",
    comment_text:
      "Kierrättäminen vähentää jätettä ja säästää luonnonvaroja! Muistathan lajitella oikein.",
    created_at: 1710336000,
  },
  {
    comment_id: 2,
    post_id: 1,
    username: "Liisa",
    comment_text:
      "Tiesitkö, että muovin voi kierrättää monella tavalla? Esimerkiksi muovipullot voi palauttaa panttia vastaan!",
    created_at: 1710343200,
  },
  {
    comment_id: 3,
    post_id: 1,
    username: "Pekka",
    comment_text:
      "Biojätteen lajittelu on tärkeää! Se voidaan kompostoida ja hyödyntää esimerkiksi lannoitteena.",
    created_at: 1710350400,
  },
];
// type MockdataProps = {
//   comments: Comment[];
// };

import { Fragment } from "react/jsx-runtime";
import "../styles/Comments.css";

// const Comments = ({ comments }: MockdataProps) => {
const Comments = () => {
  return (
    <>
      {/* KOMMENTIT */}
      <div className="comment-container">
        <h2>Comments (3)</h2>

        {comments.map((comment) => (
          <Fragment key={comment.comment_id}>
            <div className="single-container">
              <div className="comment-header">
                <div className="profile-pic"></div>
                <div className="username-time">
                  <h3>{comment.username}</h3>
                  <p>{new Date(comment.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="comment">
                <p>{comment.comment_text}</p>
              </div>
              <hr />
            </div>
          </Fragment>
        ))}
      </div>

      {/* Kommentin lisäys formi */}
      <div className="add-comment-container">
        <form>
          <label htmlFor="comment">
            <h2>Add Comment</h2>
          </label>
          {/* <input type="text" name="comment" id="comment" placeholder="jee" /> */}
          <textarea
            name="comment"
            id="comment"
            placeholder="Text"
            className="comment-textarea"
            rows={4}
          />
          <button>Send</button>
        </form>
      </div>
    </>
  );
};

export default Comments;
