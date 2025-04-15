import { Request, Response, NextFunction } from "express";
import { MessageResponse } from "ecwtypes/MessageTypes";
import { Task, TokenContent } from "ecwtypes/EcoWDBTypes";
import { deleteTask, fetchAllTasks, postTask } from "../models/taskModel";

const taskListGet = async (
  req: Request,
  res: Response<Task[]>,
  next: NextFunction
) => {
  try {
    const tasks = await fetchAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const taskPost = async (
  req: Request<{}, {}, { task_text: string; media_id: string }>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const result = await postTask(
      Number(req.body.media_id),
      res.locals.user.user_id,
      req.body.task_text
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const taskPut = async (
  req: Request<{ id: string }, {}, { task_text: string }>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const result = await updateTask(
      req.body.task_text,
      Number(req.params.id),
      res.locals.user.user_id
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const taskDelete = async (
  req: Request<{ id: string }>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const result = await deleteTask(
      Number(req.params.id),
      res.locals.user.user_id
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
