import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Tasks } from "ecwtypes/EcoWDBTypes";
import promisePool from "../../lib/db";
import { MessageResponse } from "ecwtypes/MessageTypes";
import CustomError from "../../classes/CustomError";

const fetchAllTasks = async (): Promise<Tasks[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Tasks[]>(
    "SELECT * FROM tasks"
  );
  if (rows.length === 0) {
    throw new CustomError("No tasks found", 404);
  }
  return rows;
};

const fetchTasksByMonth = async (
  month: number,
  year: number
): Promise<Tasks[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Tasks[]>(
    "SELECT * FROM tasks WHERE month = ? AND year = ?",
    [month, year]
  );
  if (rows.length === 0) {
    throw new CustomError("No tasks found", 404);
  }
  return rows;
};

const postTask = async (
  task_title: string,
  task_description: string,
  points: number,
  level: number,
  month: number,
  year: number
): Promise<MessageResponse> => {
  const [result] = await promisePool.execute<ResultSetHeader>(
    "INSERT INTO tasks (task_title, task_description, points, level, month, year) VALUES (?, ?, ?, ?, ?, ?)",
    [task_title, task_description, points, level, month, year]
  );
  if (result.affectedRows === 0) {
    throw new CustomError("Can not create task", 500);
  }
  return { message: "Task added" };
};

const taskPut = async (
  task_id: number,
  task: Partial<Tasks>
): Promise<MessageResponse> => {
  const allowedFields = [
    "task_title",
    "task_description",
    "points",
    "level",
    "month",
    "year",
  ];
  const updates = Object.entries(task)
    .filter(([key]) => allowedFields.includes(key))
    .map(([key]) => `${key} = ?`);
  const values = Object.entries(task)
    .filter(([key]) => allowedFields.includes(key))
    .map(([, value]) => value);

  const sql = `UPDATE tasks SET ${updates.join(", ")} WHERE task_id = ?`;
  const params = [...values, task_id];
  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not update task", 404);
  }
  return { message: "Task updated" };
};

const deleteTask = async (task_id: number): Promise<MessageResponse> => {
  const sql = "DELETE FROM tasks WHERE task_id = ?";

  const params = [task_id];

  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not delete task", 404);
  }
  return { message: "Task deleted" };
};

const insertUserTask = async (
  user_id: number,
  task_id: number
): Promise<MessageResponse> => {
  const [result] = await promisePool.execute<ResultSetHeader>(
    "INSERT INTO user_task (task_id, user_id, completed, active) VALUES (?, ?, 0, 1)",
    [task_id, user_id]
  );
  if (result.affectedRows === 0) {
    throw new CustomError("Can not select", 500);
  }
  return { message: "Task selected" };
};

const deleteTaskSelect = async (
  user_id: number,
  task_id: number
): Promise<MessageResponse> => {
  const sql = "DELETE FROM user_task WHERE task_id = ? AND user_id = ?";

  const params = [task_id, user_id];

  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not delete task", 404);
  }
  return { message: "Task selection removed" };
};

const updateTaskSelection = async (user_id: number, task_id: number) => {
  const sql =
    "UPDATE user_task SET completed = true WHERE task_id = ? AND user_id = ?";

  const params = [task_id, user_id];

  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not delete task", 404);
  }
  return { message: "Task selection removed" };
};

export {
  fetchAllTasks,
  fetchTasksByMonth,
  postTask,
  taskPut,
  deleteTask,
  insertUserTask,
  deleteTaskSelect,
  updateTaskSelection,
};
