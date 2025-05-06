import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import CustomError from "../../classes/CustomError";
import { LoginResponse } from "ecwtypes/MessageTypes";
import { Admin, TokenContent } from "ecwtypes/EcoWDBTypes";
import { getAdminByUsername } from "../models/adminModel";

const login = async (
  req: Request<object, object, { username: string; password: string }>,
  res: Response<LoginResponse>,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const admin = await getAdminByUsername(username);

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      next(new CustomError("Incorrect username/password", 403));
      return;
    }

    if (!process.env.JWT_SECRET) {
      next(new CustomError("JWT secret not set", 500));
      return;
    }

    const outUser: Omit<Admin, "password"> = {
      admin_id: admin.admin_id,
      username: admin.username,
      email: admin.email,
      created_at: admin.created_at,
    };

    const tokenContent: TokenContent = {
      user_id: admin.admin_id,
    };

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET);

    res.json({
      message: "Login successful",
      token,
      admin: outUser,
    });
  } catch (error) {
    next(error);
  }
};

export { login };
