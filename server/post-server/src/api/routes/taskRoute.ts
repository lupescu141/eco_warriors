import express from "express";

import { validationErrors } from "../../middlewares";
import { body, param } from "express-validator";
import {
  newPost,
  taskListGet,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router
  .route("/") // route is ...:3002/api/tasks/
  // Gets all tasks
  .get(taskListGet);

// Adds new tasks
router
  .route("/add")
  .post(
    body("task_title")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 1 })
      .escape(),
    body("task_description")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 1 })
      .escape(),
    body("points").notEmpty().isInt({ min: 1 }).toInt(),
    body("level").notEmpty().isInt({ min: 1, max: 3 }).toInt(),
    body("month").notEmpty().isInt({ min: 1, max: 12 }).toInt(),
    body("year").notEmpty().isInt({ min: 2024 }).toInt(),
    validationErrors,
    newPost
  );

router
  .route("/update/:id")
  .put(
    body("task_title")
      .optional()
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 1 })
      .escape(),
    body("task_description")
      .optional()
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 1 })
      .escape(),
    body("points").optional().notEmpty().isInt({ min: 1 }).toInt(),
    body("level").optional().notEmpty().isInt({ min: 1, max: 3 }).toInt(),
    body("month").optional().notEmpty().isInt({ min: 1, max: 12 }).toInt(),
    body("year").optional().notEmpty().isInt({ min: 2024 }).toInt(),
    validationErrors,
    updateTask
  );

router.route("/:id").get(
  param("id").isInt({ min: 1 }).toInt(),
  validationErrors
  /* ADD getTasksById HERE */
);

export default router;
