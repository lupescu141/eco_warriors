import express from 'express';
import {
  likeListGet,
  likeListByPostIdGet,
  likeListByUserIdGet,
  likePost,
  likeDelete,
  likeCountByPostIdGet,
  likeByPostIdAndUserIdGet,
} from '../controllers/likeController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

router
  .route('/') // route is ...:3002/api/likes/
  // Gets all likes
  .get(likeListGet)
  // Posts a new like
  .post(
    authenticate,
    body('media_id').isInt({min: 1}).toInt(),
    validationErrors,
    likePost,
  );

// Gets all likes on post
router
  .route('/bypost/:post_id')
  .get(
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    likeListByPostIdGet,
  );

// Gets users like status on the post
router
  .route('/bypost/user/:post_id')
  .get(
    authenticate,
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    likeByPostIdAndUserIdGet,
  );

// Gets all users liked posts (as likes, not complete post)
router
  .route('/byuser/:id')
  .get(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    likeListByUserIdGet,
  );

// Gets like count on post
router
  .route('/count/:id')
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    likeCountByPostIdGet,
  );

// Removes users like on post
router
  .route('/:id')
  .delete(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    likeDelete,
  );

export default router;
