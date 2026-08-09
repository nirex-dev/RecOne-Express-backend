import { body } from "express-validator";

export const signInValidator = [
  body("number")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isNumeric()
    .withMessage("Mobile number must be numeric"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const signUpValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .isLength({ max: 15 })
    .withMessage("Name must be at most 15 characters"),

  body("number")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isNumeric()
    .withMessage("Mobile number must be numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  body("shopId")
    .notEmpty()
    .withMessage("shopId is required")
    .isString()
    .withMessage("only string value is allowed."),
];

export const userValidator = [
  body("number")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),
];

export const otpValidator = [
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 4, max: 6 })
    .withMessage("OTP must be 6 digits"),
];

export const resetPasswordValidator = [
  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
