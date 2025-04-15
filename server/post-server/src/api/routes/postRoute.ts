import express from "express";
import {
  mediaListGet,
  mediaGet,
  mediaPost,
  mediaPut,
  mediaDelete,
  mediaByUserGet,
  mediaListMostLikedGet,
} from "../controllers/mediaController";
import { authenticate, validationErrors } from "../../middlewares";
import { body, param, query } from "express-validator";

const router = express.Router();

///
///
/// Posibly incorporate tag adding to this
///
///

router
  .route("/") // route is ...:3002/api/post/
  // Gets a list of all posts
  .get(
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1 }).toInt(),
    validationErrors,
    mediaListGet
  )
  // Post a new post to database
  .post(
    authenticate,
    body("post_title")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 0, max: 100 })
      .escape(),
    body("post_description")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ max: 2000 })
      .escape(),
    body("filename")
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[\w.-]+$/)
      .escape(),
    body("filetype").trim().notEmpty().isMimeType(),
    body("filesize").notEmpty().isInt({ min: 1 }).toInt(),
    validationErrors,
    mediaPost
  );

// Gets the most liked post
router.route("/mostliked").get(mediaListMostLikedGet);

router
  .route("/:id")
  // Get specifict post
  .get(param("id").isInt({ min: 1 }).toInt(), validationErrors, mediaGet)
  // Edits post
  .put(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    body("title")
      .optional()
      .trim()
      .isString()
      .isLength({ min: 3, max: 128 })
      .escape(),
    body("description")
      .optional()
      .trim()
      .isString()
      .isLength({ max: 1000 })
      .escape(),
    validationErrors,
    mediaPut
  )
  // Delete post
  .delete(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    mediaDelete
  );

router.route("/byuser/:id").get(mediaByUserGet);

router.route("/bytoken").get(authenticate, mediaByUserGet);

export default router;
