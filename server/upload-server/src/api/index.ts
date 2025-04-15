import express, { Request, Response } from "express";

import fileRoute from "./routes/fileRoute";
import { MessageResponse } from "ecwtypes/MessageTypes";

const router = express.Router();

router.get("/", (req: Request, res: Response<MessageResponse>) => {
  res.json({
    message: "routes: /upload, /delete",
  });
});

router.use("/", fileRoute);

export default router;
