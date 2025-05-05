import { Request, Response, NextFunction } from "express";
import {
  fetchAllPost,
  fetchPostById,
  newPost,
  deletePost,
  fetchMostLikedPost,
  fetchPostByUserId,
  putPost,
} from "../models/mediaModel";
import { MessageResponse } from "ecwtypes/MessageTypes";
import { FullPost, TokenContent } from "ecwtypes/EcoWDBTypes";
import CustomError from "../../classes/CustomError";
import { updateTaskSelection } from "../models/taskModel";

const mediaListGet = async (
  req: Request<{}, {}, { page: string; limit: string }>,
  res: Response<FullPost[]>,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    const media = await fetchAllPost(Number(page), Number(limit));
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaGet = async (
  req: Request<{ id: string }>,
  res: Response<FullPost>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const media = await fetchPostById(id);
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaPost = async (
  req: Request<
    object,
    object,
    Omit<FullPost, "post_id" | "created_at"> & { task_id: number }
  >,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    // add user_id to media object from token
    req.body.user_id = res.locals.user.user_id;
    await newPost(req.body);
    updateTaskSelection(req.body.user_id, req.body.task_id);
    res.json({ message: "Post created" });
  } catch (error) {
    next(error);
  }
};

const mediaDelete = async (
  req: Request<{ id: string }>,
  res: Response<MessageResponse, { user: TokenContent; token: string }>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await deletePost(
      id,
      res.locals.user.user_id,
      res.locals.token
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const mediaPut = async (
  req: Request<
    { id: string },
    {},
    Pick<FullPost, "post_title" | "post_description">
  >,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await putPost(req.body, id, res.locals.user.user_id);
    res.json({ message: "Post updated" });
  } catch (error) {
    next(error);
  }
};

const mediaByUserGet = async (
  req: Request<{ id: string }>,
  res: Response<FullPost[], { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id) || res.locals.user.user_id;
    if (isNaN(id)) {
      throw new CustomError("Post not found", 400);
    }

    const media = await fetchPostByUserId(id);
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaListMostLikedGet = async (
  req: Request,
  res: Response<FullPost>,
  next: NextFunction
) => {
  try {
    const media = await fetchMostLikedPost();
    res.json(media);
  } catch (error) {
    next(error);
  }
};

export {
  mediaListGet,
  mediaGet,
  mediaPost,
  mediaPut,
  mediaDelete,
  mediaByUserGet,
  mediaListMostLikedGet,
};
