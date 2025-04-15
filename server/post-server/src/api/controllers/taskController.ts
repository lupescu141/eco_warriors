import { Request, Response, NextFunction } from "express";
import { MessageResponse } from "ecwtypes/MessageTypes";
import { Comment, TokenContent } from "ecwtypes/EcoWDBTypes";

const commentListGet = async (
  req: Request,
  res: Response<Comment[]>,
  next: NextFunction
) => {
  try {
    const comments = await fetchAllComments();
    res.json(comments);
  } catch (error) {
    next(error);
  }
};
