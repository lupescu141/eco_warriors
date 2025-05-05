import "../styles/Comments.css";

import { useEffect, Fragment, useState, useRef } from "react";
import { useCommentStore } from "../store";
import { useForm } from "../hooks/formHooks";
import { MediaItemWithOwner } from "ecwtypes/EcoWDBTypes";
import { useComment, useImage } from "../hooks/apiHooks";
import { Pfresposne } from "ecwtypes/MessageTypes";
import { useUserContext } from "../hooks/contextHooks";

type CommentProps = {
  item: MediaItemWithOwner;
  deleteComment: (commentId: number) => void;
};

const Comments = (props: CommentProps) => {
  const { user } = useUserContext();
  const { getCommentsByPostId, postComment, deleteCommentbyID } = useComment();
  // kommentit zustand storesta
  const { comments, setComments } = useCommentStore();

  // props props: CommentsProps
  const { item, deleteComment } = props;

  // profiilikuvaa varten
  const { getProfileImage } = useImage();
  const [imageItem, setImage] = useState<Pfresposne>({
    origin: "default",
    filename: "default",
    message: "default",
  });

  // kommenttien määrä
  const { getCommentCountByMediaId } = useComment();
  const [commentCount, setCommentCount] = useState(0);

  const getCommentCount = async () => {
    try {
      const count = await getCommentCountByMediaId(item.post_id);
      setCommentCount(count.count);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCommentCount();
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

  // poisto
  const handleDelete = async (commentId: number) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return;
      }
      await deleteCommentbyID(commentId, token);
      console.log("comment deleted", commentId);
      deleteComment(commentId);
      getCommentCount();
      getComments();
    } catch (error) {
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
    getCommentCount();
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
        <h2>Comments ({commentCount})</h2>

        {comments.map((comment) => (
          <Fragment key={comment.comment_id}>
            <div className="single-container">
              <div className="comment-header">
                <div className="user-info">
                  <div className="profile-pic">
                    <img
                      className="profileImg"
                      src={comment.profile}
                      alt="Profile picture"
                    ></img>
                  </div>

                  <div className="username-time">
                    <h3>{comment.username}</h3>
                    <p>{new Date(comment.created_at || "").toLocaleString()}</p>
                  </div>
                </div>
                {/* DELETE */}
                {user && user.user_id === comment.user_id && (
                  <button
                    className="close delete-comment"
                    onClick={() =>
                      comment.comment_id && handleDelete(comment.comment_id)
                    }
                  >
                    x
                  </button>
                )}
              </div>

              <div className="comment">
                <p>{comment.comment}</p>
              </div>
              <hr />
            </div>
          </Fragment>
        ))}
      </div>

<<<<<<< post-be
      {/* Kommentin lisäys formi */}
=======
      {/* KOMMENTIN FORMI */}
>>>>>>> project_start
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
