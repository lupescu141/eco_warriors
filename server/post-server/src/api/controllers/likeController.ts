import {Request, Response, NextFunction} from 'express';
import {
  fetchAllLikes,
  fetchLikesByPostId,
  fetchLikesByUserId,
  postLike,
  deleteLike,
  fetchLikesCountByPostId,
  fetchLikeByPostIdAndUserId,
} from '../models/likeModel';
import {MessageResponse} from 'ecwtypes/MessageTypes';
import {Likes, TokenContent} from 'ecwtypes/EcoWDBTypes';

const likeListGet = async (
  req: Request,
  res: Response<Likes[]>,
  next: NextFunction,
) => {
  try {
    const likes = await fetchAllLikes();
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

const likeListByPostIdGet = async (
  req: Request<{media_id: string}>,
  res: Response<Likes[]>,
  next: NextFunction,
) => {
  try {
    const likes = await fetchLikesByPostId(Number(req.params.media_id));
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

const likeListByUserIdGet = async (
  req: Request<{id: string}>,
  res: Response<Likes[]>,
  next: NextFunction,
) => {
  try {
    const likes = await fetchLikesByUserId(Number(req.params.id));
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

const likePost = async (
  req: Request<{}, {}, {media_id: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const result = await postLike(
      Number(req.body.media_id),
      res.locals.user.user_id,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const likeDelete = async (
  req: Request<{id: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const result = await deleteLike(
      Number(req.params.id),
      res.locals.user.user_id,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Fetch likes count by media id
const likeCountByPostIdGet = async (
  req: Request<{id: string}>,
  res: Response<{count: number}>,
  next: NextFunction,
) => {
  try {
    const count = await fetchLikesCountByPostId(Number(req.params.id));
    res.json({count});
  } catch (error) {
    next(error);
  }
};

const likeByPostIdAndUserIdGet = async (
  req: Request<{media_id: string}>,
  res: Response<Likes, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const result = await fetchLikeByPostIdAndUserId(
      Number(req.params.media_id),
      res.locals.user.user_id,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {
  likeListGet,
  likeListByPostIdGet,
  likeListByUserIdGet,
  likePost,
  likeDelete,
  likeCountByPostIdGet,
  likeByPostIdAndUserIdGet,
};
