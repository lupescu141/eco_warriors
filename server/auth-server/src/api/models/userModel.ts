import { ResultSetHeader, RowDataPacket } from "mysql2";
import { promisePool } from "../../lib/db";
import {
  UserWithLevel,
  User,
  UserWithNoPassword,
} from "../../types/EcoWDBTypes";
import { UserDeleteResponse } from "../../types/MessageTypes";
import CustomError from "../../classes/CustomError";

///////
// TODO: update sql to match database
//////

const getUserById = async (id: number): Promise<UserWithNoPassword> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & UserWithNoPassword[]
  >(
    `SELECT user_id, username, email, created_at
     FROM users
     WHERE Users.user_id = ?`,
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

const getUserByEmail = async (email: string): Promise<UserWithLevel> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & UserWithLevel[]>(
    `SELECT Users.user_id, Users.username, Users.password, Users.email, Users.created_at, UserLevels.level_name
     FROM Users
     JOIN UserLevels ON Users.user_level_id = UserLevels.level_id
     WHERE Users.email = ?`,
    [email]
  );
  if (rows.length === 0) {
    throw new CustomError("User not found", 404);
  }
  return rows[0];
};

const getUserByUsername = async (username: string): Promise<User> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
    `SELECT user_id, username, password, email, created_at
     FROM users WHERE username = ?`,
    [username]
  );
  if (rows.length === 0) {
    // Important change error content after debugging
    throw new CustomError("User not found", 404);
  }
  return rows[0];
};

const createUser = async (
  user: Pick<User, "username" | "password" | "email">
): Promise<UserWithNoPassword> => {
  const sql = `INSERT INTO users (username, password, email)
       VALUES (?, ?, ?)`;
  const stmt = promisePool.format(sql, [
    user.username,
    user.password,
    user.email,
  ]);
  const [result] = await promisePool.execute<ResultSetHeader>(stmt);

  if (result.affectedRows === 0) {
    throw new CustomError("Failed to create user", 500);
  }

  return await getUserById(result.insertId);
};

const modifyUser = async (
  user: Partial<User>,
  id: number
): Promise<UserWithNoPassword> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    const allowedFields = ["username", "email", "password", "user_level_id"];
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
      `UPDATE Users SET ${updates.join(", ")} WHERE user_id = ?`,
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

// needs modification add likes table maybe
const deleteUser = async (id: number): Promise<UserDeleteResponse> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM comments WHERE user_id = ?;", [id]);
    /* await connection.execute("DELETE FROM likes WHERE user_id = ?;", [id]); */
    await connection.execute("DELETE FROM user_stats WHERE user_id = ?;", [id]);
    await connection.execute("DELETE FROM posts WHERE user_id = ?;", [id]);
    await connection.execute(
      "DELETE FROM post_images WHERE post_id IN (SELECT id FROM posts WHERE user_id = ?);",
      [id]
    );
    await connection.execute("DELETE FROM top10 WHERE user_id = ?;", [id]);
    // Deleted some odd repeted data. Check again later
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM users WHERE user_id = ?;",
      [id]
    );

    await connection.commit();

    if (result.affectedRows === 0) {
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
  deleteUser,
};
