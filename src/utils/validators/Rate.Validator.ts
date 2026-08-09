import { body } from "express-validator";

export const rateValidator = [
  body("goldH")
    .notEmpty()
    .withMessage("Gold rate is required")
    .isNumeric()
    .withMessage("Gold rate must be numeric")
    .isLength({ max: 12 })
    .withMessage("Gold rate lenght excided."),

  body("goldG")
    .notEmpty()
    .withMessage("Gold rate is required")
    .isNumeric()
    .withMessage("Gold rate must be numeric")
    .isLength({ max: 12 })
    .withMessage("Gold rate lenght excided."),

  body("silver")
    .notEmpty()
    .withMessage("Sliver rate is required")
    .isNumeric()
    .withMessage("Sliver rate must be numeric")
    .isLength({ max: 12 })
    .withMessage("Sliver rate lenght excided."),

  body("cbSilver")
    .notEmpty()
    .withMessage("Sliver rate is required")
    .isNumeric()
    .withMessage("Sliver rate must be numeric")
    .isLength({ max: 12 })
    .withMessage("Sliver rate lenght excided."),
];

export const deleteRateValidator = [
  body("driveFoldeId")
    .notEmpty()
    .withMessage("Delete id is required")
    .isString()
    .withMessage("Delete id must be string"),
];
