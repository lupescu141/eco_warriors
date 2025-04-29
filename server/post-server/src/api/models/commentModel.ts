import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Comment } from "ecwtypes/EcoWDBTypes";
import promisePool from "../../lib/db";
import { MessageResponse } from "ecwtypes/MessageTypes";
import CustomError from "../../classes/CustomError";

const picturePath = process.env.PICTURE_URL;

// Request a list of comments
const fetchAllComments = async (): Promise<Comment[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Comment[]>(
    "SELECT * FROM comments"
  );
  if (rows.length === 0) {
    throw new CustomError("No comments found", 404);
  }
  return rows;
};

// Request a list of comments by media item id
const fetchCommentsByPostId = async (id: number): Promise<Comment[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Comment[]>(
    "SELECT comments.comment_id, comments.user_id, comments.`comment`, users.username, CONCAT(?, user_pic.filename) AS profile, comments.created_at  FROM comments LEFT JOIN (users, user_pic) ON (users.user_id = comments.user_id AND user_pic.user_id = comments.user_id) WHERE post_id = ? ",
    [picturePath, id]
  );
  if (rows.length === 0) {
    throw new CustomError("Comment not found", 404);
  }
  return rows;
};

// Request a count of comments by media item id
const fetchCommentsCountByPostId = async (id: number): Promise<number> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & { commentsCount: number }[]
  >("SELECT COUNT(*) as commentsCount FROM comments WHERE post_id = ?", [id]);
  return rows[0].commentsCount;
};

// Request a list of comments by user id
const fetchCommentsByUserId = async (id: number): Promise<Comment[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Comment[]>(
    "SELECT * FROM comments WHERE user_id = ?",
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError("Can not find comment with user", 404);
  }
  return rows;
};

// Request a comment by id
const fetchCommentById = async (id: number): Promise<Comment> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Comment[]>(
    "SELECT * FROM comments WHERE comment_id = ?",
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError("Comment not found", 404);
  }
  return rows[0];
};

// Create a new comment
const postComment = async (
  post_id: number,
  user_id: number,
  comment: string
): Promise<MessageResponse> => {
  console.log(
    "post id is: " + post_id,
    " user_id: " + user_id,
    " comment: " + comment
  );
  const [result] = await promisePool.execute<ResultSetHeader>(
    "INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)",
    [post_id, user_id, comment]
  );
  if (result.affectedRows === 0) {
    throw new CustomError("Can not create comment", 500);
  }
  return { message: "Comment added" };
};

// Update a comment
const updateComment = async (
  comment_text: string,
  comment_id: number,
  user_id: number
): Promise<MessageResponse> => {
  let sql = "";
  //
  //
  // Rewrite this
  /*   if (user_level === 'Admin') {
    sql = 'UPDATE comments SET comment_text = ? WHERE comment_id = ?';
  } else {*/
  sql =
    "UPDATE comments SET comment_text = ? WHERE comment_id = ? AND user_id = ?";

  /*     user_level === 'Admin'
      ? [comment_text, comment_id]
      : */
  const params = [comment_text, comment_id, user_id];
  //
  //
  //

  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not update comment", 404);
  }
  return { message: "Comment updated" };
};

// Delete a comment
const deleteComment = async (
  id: number,
  user_id: number
): Promise<MessageResponse> => {
  let sql = "";
  //
  //
  // Rewrite this
  /*   if (user_level === 'Admin') {
    sql = 'DELETE FROM comments WHERE comment_id = ?';
  } else { */
  sql = "DELETE FROM comments WHERE comment_id = ? AND user_id = ?";

  // user_level === 'Admin' ? [id] :
  const params = [id, user_id];
  //
  //
  //

  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not delete comment", 404);
  }
  return { message: "Comment deleted" };
};

export {
  fetchAllComments,
  fetchCommentsByPostId,
  fetchCommentsCountByPostId,
  fetchCommentsByUserId,
  fetchCommentById,
  postComment,
  updateComment,
  deleteComment,
};
