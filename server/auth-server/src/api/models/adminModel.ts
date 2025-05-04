import { ResultSetHeader, RowDataPacket } from "mysql2";
import { promisePool } from "../../lib/db";
import { User, UserWithNoPassword } from "ecwtypes/EcoWDBTypes";
import { Pfresposne, UserDeleteResponse } from "ecwtypes/MessageTypes";
import CustomError from "../../classes/CustomError";

const getAdminByUsername = async (username: string): Promise<User | null> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
    `SELECT user_id, username, password, email, created_at
       FROM admin WHERE username = ?`,
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

export { getAdminByUsername };

/* 
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
  */
