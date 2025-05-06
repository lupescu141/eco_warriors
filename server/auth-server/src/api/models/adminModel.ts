import { ResultSetHeader, RowDataPacket } from "mysql2";
import { promisePool } from "../../lib/db";
import { Admin, UserWithNoPassword } from "ecwtypes/EcoWDBTypes";
import { UserDeleteResponse } from "ecwtypes/MessageTypes";
import CustomError from "../../classes/CustomError";

const getAdminByUsername = async (username: string): Promise<Admin | null> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Admin[]>(
    `SELECT admin_id, username, password, email, created_at
       FROM admin WHERE username = ?`,
    [username]
  );
  if (rows.length === 0) {
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
