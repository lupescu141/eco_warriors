import express from "express";
import {
  commentListGet,
  commentListByPostIdGet,
  commentListByUserGet,
  commentCountByPostIdGet,
  commentGet,
  commentPost,
  commentPut,
  commentDelete,
} from "../controllers/commentController";
import { authenticate, validationErrors } from "../../middlewares";
import { body, param } from "express-validator";

const router = express.Router();

router
  .route("/") // route is ...:3002/api/comments/
  // Gets all comments
  .get(commentListGet)
  // Posts a new comments
  .post(
    authenticate,
    body("comment").trim().notEmpty().isString().isLength({ min: 1 }).escape(),
    body("post_id").notEmpty().isInt({ min: 1 }).toInt(),
    validationErrors,
    commentPost
  );

// Gets all comments in a post
router
  .route("/bypost/:id")
  .get(
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    commentListByPostIdGet
  );

// Gets users all comments
router.route("/byuser").get(authenticate, commentListByUserGet);

// Gets the number of comments in a post
router
  .route("/count/:id")
  .get(
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    commentCountByPostIdGet
  );

router
  .route("/:id")
  // Gets specific comment by comment id
  .get(param("id").isInt({ min: 1 }).toInt(), validationErrors, commentGet)
  // Edists comment
  .put(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    body("comment_text")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 1 })
      .escape(),
    validationErrors,
    commentPut
  )
  // Deletes comment
  .delete(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    commentDelete
  );

export default router;
