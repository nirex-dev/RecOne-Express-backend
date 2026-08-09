import multer from "multer";
import AppError from "../utils/AppError";
import HttpStatus from "../constants/httpStatus";

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024, // 10mb
  },

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new AppError(
          "Only image files are allowed.",
          HttpStatus.BAD_REQUEST,
        ) as any,
      );
    }

    cb(null, true);
  },
});
