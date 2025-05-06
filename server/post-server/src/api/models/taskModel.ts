import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Tasks } from "ecwtypes/EcoWDBTypes";
import promisePool from "../../lib/db";
import { MessageResponse } from "ecwtypes/MessageTypes";
import CustomError from "../../classes/CustomError";

const fetchAllTasks = async (): Promise<Tasks[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Tasks[]>(
    "SELECT * FROM comments"
  );
  if (rows.length === 0) {
    throw new CustomError("No comments found", 404);
  }
  return rows;
};

const postTask = async (
  post_id: number,
  user_id: number,
  comment_text: string
): Promise<MessageResponse> => {
  const [result] = await promisePool.execute<ResultSetHeader>(
    "INSERT INTO comments (post_id, user_id, comment_text) VALUES (?, ?, ?)",
    [post_id, user_id, comment_text]
  );
  if (result.affectedRows === 0) {
    throw new CustomError("Can not create comment", 500);
  }
  return { message: "Task added" };
};

const deleteTask = async (
  id: number,
  user_id: number
): Promise<MessageResponse> => {
  let sql = "";

  sql = "DELETE FROM comments WHERE comment_id = ? AND user_id = ?";

  const params = [id, user_id];

  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not delete comment", 404);
  }
  return { message: "Task deleted" };
};

export { fetchAllTasks, postTask, deleteTask };
