import express from 'express';
import {
  tagListGet,
  tagListByPostIdGet,
  tagPost,
  tagDelete,
  tagFilesByTagGet,
  tagDeleteFromPost,
} from '../controllers/tagController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

router
  .route('/') // route is ...:3002/api/tags/
  // gets a list of tags
  .get(tagListGet)
  // adds new tag
  .post(
    authenticate,
    body('tag_name')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 2, max: 50})
      .escape(),
    body('media_id').isInt({min: 1}).toInt(),
    validationErrors,
    tagPost,
  );

router
  .route('/bypost/:id')
  // gets tag by post
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    tagListByPostIdGet,
  );

router
  .route('/bypost/:post_id/:tag_id')
  // removes tag from media
  .delete(
    authenticate,
    param('post_id').isInt({min: 1}).toInt(),
    param('tag_id').isInt({min: 1}).toInt(),
    validationErrors,
    tagDeleteFromPost,
  );

router
  .route('/bytag/:tag_id')
  // gets tag bu tag id
  .get(
    param('tag_id').isInt({min: 1}).toInt(),
    validationErrors,
    tagFilesByTagGet,
  );

router
  .route('/:id')
  // deletes tag
  .delete(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    tagDelete,
  );

export default router;
