import { Request, Response, NextFunction } from "express";
import CustomError from "../../classes/CustomError";
import fs from "fs";
import { TokenContent } from "ecwtypes/EcoWDBTypes";
import { MessageResponse, UploadResponse } from "ecwtypes/MessageTypes";

const UPLOAD_DIR = "./upload-profile";

const uploadPic = async (
  req: Request,
  res: Response<UploadResponse, { user: TokenContent; screenshots: string[] }>,
  next: NextFunction
) => {
  const tempFiles: string[] = [];
  try {
    if (!req.file) {
      throw new CustomError("file not valid", 400);
    }

    const extension = req.file.originalname.split(".").pop();
    if (!extension) {
      throw new CustomError("Invalid file extension", 400);
    }

    // Append user_id to the random filename
    const filename = `${req.file.filename}_${res.locals.user.user_id}.${extension}`;
    const targetPath = `${UPLOAD_DIR}/${filename}`;
    tempFiles.push(req.file.path);

    try {
      fs.renameSync(req.file.path, targetPath);

      //used for thumbnail
      const thumbPath = `${req.file.path}-thumb.png`;
      if (fs.existsSync(thumbPath)) {
        const targetThumbPath = `${UPLOAD_DIR}/${filename}-thumb.png`;
        fs.renameSync(thumbPath, targetThumbPath);
      }
    } catch {
      // Cleanup any created files on error
      cleanup(tempFiles);
      throw new CustomError("Error processing files", 500);
    }

    const response: UploadResponse = {
      message: "file uploaded",
      data: {
        filename,
        filetype: req.file.mimetype,
        filesize: req.file.size,
      },
    };

    res.json(response);
  } catch (error) {
    cleanup(tempFiles);
    next(
      error instanceof CustomError
        ? error
        : new CustomError((error as Error).message, 400)
    );
  }
};

// midleware
const deletePic = async (
  req: Request<{ filename: string }>,
  res: Response<MessageResponse, { user: TokenContent }>,
  next: NextFunction
) => {
  try {
    const { filename } = req.params;
    if (filename === "defaul-img") {
      return;
    }
    const fileUserId = filename.split("_").pop()?.split(".")[0];
    if (!fileUserId || fileUserId !== res.locals.user.user_id.toString()) {
      console.log(new CustomError("user not authorized", 401));
      return;
    }

    const filePath = `${UPLOAD_DIR}/${filename}`;
    const thumbPath = `${UPLOAD_DIR}/${filename}-thumb.png`;

    if (!fs.existsSync(filePath)) {
      console.log(new CustomError("file not found", 404));
      return;
    }

    try {
      if (fs.existsSync(thumbPath)) {
        fs.unlinkSync(thumbPath);
      }
      fs.unlinkSync(filePath);
    } catch {
      console.log(new CustomError("Error deleting files", 500));
    }
  } catch (error) {
    next(
      error instanceof CustomError
        ? error
        : new CustomError((error as Error).message, 400)
    );
  } finally {
    next();
  }
};

// Helper function to clean up temporary files
const cleanup = (files: string[]) => {
  files.forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    } catch (error) {
      console.error(`Error cleaning up file ${file}:`, error);
    }
  });
};

export { uploadPic, deletePic };
