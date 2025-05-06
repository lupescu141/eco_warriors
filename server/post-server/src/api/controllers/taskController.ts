import { Request, Response, NextFunction } from "express";
import { MessageResponse } from "ecwtypes/MessageTypes";
import { Tasks, TokenContent } from "ecwtypes/EcoWDBTypes";
import {
  deleteTask,
  deleteTaskSelect,
  fetchAllTasks,
  fetchTasksByMonth,
  insertUserTask,
  postTask,
  taskPut,
  fetchUserTasks,
} from "../models/taskModel";

const taskListGet = async (
  req: Request,
  res: Response<Tasks[]>,
  next: NextFunction
) => {
  try {
    const tasks = await fetchAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

///
const userTaskListGet = async (
  req: Request,
  res: Response<Tasks[]>,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.userId);
    const tasks = await fetchUserTasks(userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskByMonth = async (
  req: Request<{ month: string }, object, object>,
  res: Response<Tasks[]>,
  next: NextFunction
) => {
  try {
    const year = new Date().getFullYear();
    const tasks = await fetchTasksByMonth(Number(req.params.month), year);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const newTask = async (
  req: Request<
    object,
    object,
    {
      task_title: string;
      task_description: string;
      points: number;
      level: number;
      month: number;
      year: number;
    }
  >,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const result = await postTask(
      req.body.task_title,
      req.body.task_description,
      req.body.points,
      req.body.level,
      req.body.month,
      req.body.year
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (
  req: Request<{ id: string }, object, Partial<Tasks>>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const result = await taskPut(Number(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const taskDelete = async (
  req: Request<{ id: string }>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const result = await deleteTask(Number(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const selectTask = async (
  req: Request<{ id: string }>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const result = await insertUserTask(
      res.locals.user.user_id,
      Number(req.params.id)
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeTaskSelect = async (
  req: Request<{ id: string }>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const result = await deleteTaskSelect(
      res.locals.user.user_id,
      Number(req.params.id)
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {
  taskListGet,
  newTask,
  updateTask,
  taskDelete,
  getTaskByMonth,
  selectTask,
  removeTaskSelect,
  userTaskListGet,
};
