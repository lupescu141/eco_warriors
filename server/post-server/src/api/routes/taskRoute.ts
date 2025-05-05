import express from "express";

import { authenticate, validationErrors } from "../../middlewares";
import { body, param } from "express-validator";
import {
  getTaskByMonth,
  newTask,
  removeTaskSelect,
  selectTask,
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
    newTask
  );

router.route("/:id");
router
  .route("/:id")
  .get(
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors
    /* ADD getTasksById HERE */
  )
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
  )
  .delete(param("id").isInt({ min: 1 }).toInt(), validationErrors);

router
  .route("/month/:month")
  .get(
    param("month").isInt({ min: 1 }).toInt(),
    validationErrors,
    getTaskByMonth
  );

router
  .route("/select/:id")
  .post(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    selectTask
  )
  .delete(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    removeTaskSelect
  );

export default router;
