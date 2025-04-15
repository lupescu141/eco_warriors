import express, { Request, Response } from "express";
import postRoute from "./routes/postRoute";
import tagRoute from "./routes/tagRoute";
import likeRoute from "./routes/likeRoute";
import commentsRoute from "./routes/commentRoute";
import taskRoute from "./routes/taskRoute";
import { MessageResponse } from "ecwtypes/MessageTypes";

const router = express.Router();

router.get("/", (req: Request, res: Response<MessageResponse>) => {
  res.json({
    message: "post api",
  });
});

router.use("/post", postRoute);
router.use("/tags", tagRoute);
router.use("/likes", likeRoute);
router.use("/comments", commentsRoute);
// not implemented yeat
router.use("/tasks", taskRoute);

export default router;
