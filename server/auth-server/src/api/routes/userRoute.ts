import express from "express";
import {
  checkEmailExists,
  checkToken,
  checkUsernameExists,
  fetchUserPic,
  userDelete,
  userDeleteAsAdmin,
  userGet,
  userListGet,
  userPic,
  userPost,
  userPut,
  userPutAsAdmin,
  top100Get,
  top10Get,
} from "../controllers/userController";
import { authenticate, validationErrors } from "../../middlewares";
import { body, param } from "express-validator";

const router = express.Router();

// gets a list of users
// (delete in final build)
router.get("/", userListGet);

// Create a user
router.post(
  "/",
  body("username")
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3-50 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores and dashes"
    ),
  body("password")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format"),
  validationErrors,
  userPost
);

// Modify user
router.put(
  "/",
  authenticate,
  body("username")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 45 })
    .withMessage("Username must be between 3-45 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores and dashes"
    ),
  body("password")
    .optional()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format"),
  validationErrors,
  userPut
);

router.get("/profile-picture", authenticate, fetchUserPic);

router
  .route("/profile-picture")
  .put(
    authenticate,
    body("filetype").trim().notEmpty().isMimeType(),
    body("filesize").notEmpty().isInt({ min: 1 }).toInt(),
    userPic
  );

// Delete user as user
router.delete("/", authenticate, userDelete);

// Checks token does nothing else (safe to disregard)
router.get("/token", authenticate, checkToken);

// gets user data but not password (not used for login only getting user data)
router.route("/:id").get(param("id").isNumeric(), validationErrors, userGet);

// Creating admin
// (function "userPutAsAdmin" needs to be reworked)
router.route("/:id").put(
  authenticate,
  param("id").isNumeric(),
  body("username")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3-50 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores and dashes"
    ),
  body("password")
    .optional()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format"),
  validationErrors,
  userPutAsAdmin
);

// Delete users as admin
// ("userDeleteAsAdmin" needs to be reworked)
router
  .route("/:id")
  .delete(
    authenticate,
    param("id").isNumeric(),
    validationErrors,
    userDeleteAsAdmin
  );

// Used for checking if email is already in use
router.get(
  "/email/:email",
  param("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format"),
  validationErrors,
  checkEmailExists
);

// Used for checking if username is already in use
router.get(
  "/username/:username",
  param("username")
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3-50 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores and dashes"
    ),
  validationErrors,
  checkUsernameExists
);

router.get("/leaderboard/top100", top100Get);

router.get("/leaderboard/top10", top10Get);

export default router;
