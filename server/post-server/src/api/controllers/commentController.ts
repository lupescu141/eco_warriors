import { Request, Response, NextFunction } from "express";
import {
  fetchAllComments,
  fetchCommentsByPostId,
  fetchCommentsCountByPostId,
  fetchCommentsByUserId,
  fetchCommentById,
  postComment,
  updateComment,
  deleteComment,
} from "../models/commentModel";
import { MessageResponse } from "ecwtypes/MessageTypes";
import { Comment, TokenContent } from "ecwtypes/EcoWDBTypes";

// list of comments
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

// list of comments by media item id
const commentListByPostIdGet = async (
  req: Request<{ id: string }>,
  res: Response<Comment[]>,
  next: NextFunction
) => {
  try {
    const comments = await fetchCommentsByPostId(Number(req.params.id));
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// list of comments by user id
const commentListByUserGet = async (
  req: Request,
  res: Response<Comment[], { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const comments = await fetchCommentsByUserId(
      Number(res.locals.user.user_id)
    );
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// list of comments count by media item id
const commentCountByPostIdGet = async (
  req: Request<{ id: string }>,
  res: Response<{ count: number }>,
  next: NextFunction
) => {
  try {
    const count = await fetchCommentsCountByPostId(Number(req.params.id));
    res.json({ count });
  } catch (error) {
    next(error);
  }
};

// Get a comment by id
const commentGet = async (
  req: Request<{ id: string }>,
  res: Response<Comment>,
  next: NextFunction
) => {
  try {
    const comment = await fetchCommentById(Number(req.params.id));
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

// Post a new comment
const commentPost = async (
  req: Request<{}, {}, { comment: string; post_id: string }>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    console.log(
      "post id is: " + req.body.post_id,
      " user_id: " + res.locals.user.user_id,
      " comment: " + req.body.comment
    );
    const result = await postComment(
      Number(req.body.post_id),
      res.locals.user.user_id,
      req.body.comment
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Update a comment
const commentPut = async (
  req: Request<{ id: string }, {}, { comment_text: string }>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const result = await updateComment(
      req.body.comment_text,
      Number(req.params.id),
      res.locals.user.user_id
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Delete a comment
const commentDelete = async (
  req: Request<{ id: string }>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const result = await deleteComment(
      Number(req.params.id),
      res.locals.user.user_id
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {
  commentListGet,
  commentListByPostIdGet,
  commentListByUserGet,
  commentCountByPostIdGet,
  commentGet,
  commentPost,
  commentPut,
  commentDelete,
};
