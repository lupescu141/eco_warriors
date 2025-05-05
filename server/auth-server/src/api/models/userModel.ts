import { ResultSetHeader, RowDataPacket } from "mysql2";
import { promisePool } from "../../lib/db";
import { ProfilePic, User, UserWithNoPassword } from "ecwtypes/EcoWDBTypes";
import { Pfresposne, UserDeleteResponse } from "ecwtypes/MessageTypes";
import CustomError from "../../classes/CustomError";

const uploadPath = process.env.UPLOAD_URL;

const getUserById = async (id: number): Promise<UserWithNoPassword> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & UserWithNoPassword[]
  >(
    `SELECT user_id, username, email, created_at
     FROM users
     WHERE user_id = ?`,
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError("User not found", 404);
  }
  return rows[0];
};

const getAllUsers = async (): Promise<UserWithNoPassword[]> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & UserWithNoPassword[]
  >(
    `SELECT user_id, username, email, created_at
     FROM users`
  );
  return rows; // Return empty array if no users found
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
    `SELECT user_id, username, password, email, created_at
     FROM users
     WHERE email = ?`,
    [email]
  );
  if (rows.length === 0) {
    return null;
    /* throw new CustomError("User not found", 404); */
  }
  return rows[0];
};

const getUserByUsername = async (username: string): Promise<User | null> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
    `SELECT user_id, username, password, email, created_at
     FROM users WHERE username = ?`,
    [username]
  );
  if (rows.length === 0) {
    // Important change error content after debugging !!!!
    // this message is returned to the user
    /* throw new CustomError("User not found", 404); */
    return null;
  }
  return rows[0];
};

const createUser = async (
  user: Pick<User, "username" | "password" | "email">
): Promise<UserWithNoPassword> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    const sql = `INSERT INTO users (username, password, email)
    VALUES (?, ?, ?)`;

    const sql2 = `INSERT INTO user_stats (user_id)
    VALUES (?)`;

    const sql3 = `INSERT INTO user_pic (user_id)
    VALUES (?)`;
    const [result] = await connection.execute<ResultSetHeader>(sql, [
      user.username,
      user.password,
      user.email,
    ]);
    await connection.execute(sql2, [result.insertId]);
    await connection.execute(sql3, [result.insertId]);
    await connection.commit();

    if (result.affectedRows === 0) {
      throw new CustomError("Failed to create user", 500);
    }

    return await getUserById(result.insertId);
  } finally {
    connection.release();
  }
};

const modifyUser = async (
  user: Partial<User>,
  id: number
): Promise<UserWithNoPassword> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    const allowedFields = ["username", "email", "password"];
    const updates = Object.entries(user)
      .filter(([key]) => allowedFields.includes(key))
      .map(([key]) => `${key} = ?`);
    const values = Object.entries(user)
      .filter(([key]) => allowedFields.includes(key))
      .map(([, value]) => value);

    if (updates.length === 0) {
      throw new CustomError("No valid fields to update", 400);
    }
    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE users SET ${updates.join(", ")} WHERE user_id = ?`,
      [...values, id]
    );
    if (result.affectedRows === 0) {
      throw new CustomError("User not found", 404);
    }

    await connection.commit();
    const updatedUser = await getUserById(id);
    return updatedUser;
  } finally {
    connection.release();
  }
};

const newPic = async (pic: ProfilePic) => {
  await promisePool.execute<ResultSetHeader>(
    `UPDATE user_pic SET filename = ?, filesize = ?, filetype = ? WHERE user_id = ?`,
    [pic.filename, pic.filesize, pic.filetype, pic.user_id]
  );
  return;
};

const getUserPic = async (user_id: number) => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Pfresposne[]>(
    `SELECT filename as origin, CONCAT(?, filename) AS filename FROM user_pic WHERE user_id=?`,
    [uploadPath, user_id]
  );

  return rows[0];
};

// needs modification add likes table maybe
const deleteUser = async (id: number): Promise<UserDeleteResponse> => {
  const connection = await promisePool.getConnection();
  try {
    // deletes all user data from relevant tables and then the user
    await connection.beginTransaction();
    await connection.execute("DELETE FROM comments WHERE user_id = ?;", [id]);
    await connection.execute("DELETE FROM likes WHERE user_id = ?;", [id]);
    await connection.execute("DELETE FROM comments WHERE user_id = ?;", [id]);
    await connection.execute("DELETE FROM user_stats WHERE user_id = ?;", [id]);
    await connection.execute(
      "DELETE FROM likes WHERE post_id IN (SELECT post_id FROM posts WHERE user_id = ?) ;",
      [id]
    );
    await connection.execute(
      "DELETE FROM comments WHERE post_id IN (SELECT post_id FROM posts WHERE user_id = ?) ;",
      [id]
    );
    await connection.execute("DELETE FROM posts WHERE user_id = ?;", [id]);
    await connection.execute("DELETE FROM top10 WHERE user_id = ?;", [id]);
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM users WHERE user_id = ?;",
      [id]
    );

    await connection.commit();

    if (result.affectedRows === 0) {
      // Important change error content after debugging !!!!
      // this message is returned to the user
      throw new CustomError("User not found", 404);
    }

    console.log("result", result);
    return { message: "User deleted", user: { user_id: id } };
  } finally {
    connection.release();
  }
};

export {
  getUserById,
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
  createUser,
  modifyUser,
  newPic,
  getUserPic,
  deleteUser,
};
