import express, { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { authenticate /* , makeThumbnail */ } from "../../middlewares";
import { deletePic, uploadPic } from "../controllers/profilePicController";

const fileFilter = (
  _request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  console.log("file", file);
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ dest: "./upload-profile/", fileFilter });
const router = express.Router();

router
  .route("/change/:filename")
  .post(
    authenticate,
    upload.single("file"),
    /* makeThumbnail, */ deletePic,
    uploadPic
  );

router.route("/delete/:filename").delete(authenticate, deletePic);

export default router;
