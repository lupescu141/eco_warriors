// type Comment = {
//   comment_id: number;
//   post_id: number;
//   username: string;
//   comment_text: string;
//   created_at: number;
// };

// const comments: Comment[] = [
//   {
//     comment_id: 1,
//     post_id: 2,
//     username: "Matti",
//     comment_text:
//       "Kierrättäminen vähentää jätettä ja säästää luonnonvaroja! Muistathan lajitella oikein.",
//     created_at: 1710336000,
//   },
//   {
//     comment_id: 2,
//     post_id: 1,
//     username: "Liisa",
//     comment_text:
//       "Tiesitkö, että muovin voi kierrättää monella tavalla? Esimerkiksi muovipullot voi palauttaa panttia vastaan!",
//     created_at: 1710343200,
//   },
//   {
//     comment_id: 3,
//     post_id: 1,
//     username: "Pekka",
//     comment_text:
//       "Biojätteen lajittelu on tärkeää! Se voidaan kompostoida ja hyödyntää esimerkiksi lannoitteena.",
//     created_at: 1710350400,
//   },
// ];
// // type MockdataProps = {
// //   comments: Comment[];
// // };

import "../styles/Comments.css";

import { useEffect, Fragment, useState, useRef } from "react";
import { useCommentStore } from "../store";
import { useForm } from "../hooks/formHooks";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";
import { useComment, useImage } from "../hooks/apiHooks";
import { Pfresposne } from "ecwtypes/MessageTypes";

const Comments = ({ item }: { item: MediaItemWithOwner }) => {
  const { getCommentsByPostId, postComment } = useComment();
  // kommentit zustand storesta
  const { comments, setComments } = useCommentStore();

  // profiilikuvaa varten
  const { getProfileImage } = useImage();
  const [imageItem, setImage] = useState<Pfresposne>({
    origin: "default",
    filename: "default",
    message: "default",
  });

  useEffect(() => {
    getComments();
  }, [item]);

  const getComments = async () => {
    try {
      const comments = await getCommentsByPostId(item.post_id);
      setComments(comments);
    } catch (error) {
      setComments([]);
      console.error((error as Error).message);
    }
  };

  // profiilikuva
  useEffect(() => {
    const getImage = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const image = await getProfileImage(token);
      if (!image) return;
      setImage(image);
    };
    getImage();
  }, []);

  // kommentin lisäys
  const inputRef = useRef<HTMLInputElement | null>(null);
  const initValues = { comment_text: "" };

  const doComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    // postatataan kommentti
    await postComment(inputs.comment, item.post_id, token);
    getComments();
    // tyhjennä form
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setInputs(initValues);
  };

  // formin käsittely form hookilla
  const { handleSubmit, handleInputChange, inputs, setInputs } = useForm(
    doComment,
    initValues
  );

  console.log("Kommentit:", comments);
  return (
    <>
      {/* KOMMENTIT */}
      <div className="comment-container">
        <h2>Comments (3)</h2>

        {comments.map((comment) => (
          <Fragment key={comment.comment_id}>
            <div className="single-container">
              <div className="comment-header">
                <img
                  className="profile-pic"
                  src={imageItem.filename}
                  alt="Profile picture"
                ></img>
                <div className="username-time">
                  <h3>{comment.username}</h3>
                  <p>{new Date(comment.created_at || "").toLocaleString()}</p>
                </div>
              </div>
              <div className="comment">
                <p>{comment.comment}</p>
              </div>
              <hr />
            </div>
          </Fragment>
        ))}
      </div>

      {/* KOMMENTIN FORMI */}
      <div className="add-comment-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment">
            <h2>Add Comment</h2>
          </label>
          {/* <input type="text" name="comment" id="comment" placeholder="jee" /> */}
          <input
            name="comment"
            id="comment"
            placeholder="Text"
            onChange={handleInputChange}
            autoComplete="username"
            ref={inputRef}
            className="comment-textarea"
          />
          <button>Send</button>
        </form>
      </div>
    </>
  );
};

export default Comments;
