import { body } from "express-validator";

export const createShopValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be string")
    .isLength({ min: 5 })
    .withMessage("Name must be atleast 5 charactor.")
    .isLength({ max: 20 })
    .withMessage("Name must be atleast 20 charactor."),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be string")
    .isLength({ min: 3 })
    .withMessage("Name must be atleast 3 charactor.")
    .isLength({ max: 20 })
    .withMessage("Name must be atleast 20 charactor."),
];
