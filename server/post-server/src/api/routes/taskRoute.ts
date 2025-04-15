import express from "express";

import { authenticate, validationErrors } from "../../middlewares";
import { body, param } from "express-validator";

const router = express.Router();

router
  .route("/") // route is ...:3002/api/tasks/
  // Gets all tasks
  .get(/* ADD getTasksList HERE */);

// Adds new tasks
router.route("/add").post(
  authenticate,
  body("tasks_description")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 1 })
    .escape(),
  body("task_id").notEmpty().isInt({ min: 1 }).toInt(),
  validationErrors
  // ADD postTasks HERE
);

router.route("/:id").get(
  param("id").isInt({ min: 1 }).toInt(),
  validationErrors
  /* ADD getTasksById HERE */
);

export default router;
