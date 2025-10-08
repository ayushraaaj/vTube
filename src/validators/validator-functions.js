import { body } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const userRegisterValidator = () => {
    return [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .bail()
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .bail()
            .isLength({ min: 5 })
            .withMessage("Username must be atleast 5 characters long"),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isLowercase()
            .withMessage("Email must be in lowercase")
            .bail()
            .isEmail()
            .withMessage("Email is invalid"),

        body("fullname")
            .trim()
            .notEmpty()
            .withMessage("Fullname is required")
            .bail()
            .isLength({ min: 3 })
            .withMessage("Fullname must be atleast 3 characters long"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .bail()
            .isLength({ min: 5 })
            .withMessage("Password must be atleast 5 characters long"),

        body("avatar")
            .optional()
            .custom((_, { req }) => {
                // if (!req.files?.avatar || req.files.avatar.length === 0) {
                //     throw new ApiError(400, "Avatar file is required");
                // }

                const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
                const file = req.files?.avatar?.[0];

                if (!allowedTypes.includes(file.mimetype)) {
                    throw new ApiError(
                        400,
                        "Avatar must be a JPEG, PNG, WEBP file"
                    );
                }

                return true;
            }),

        body("coverImage")
            .optional()
            .custom((_, { req }) => {
                const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
                const file = req.files?.coverImage?.[0];

                if (!allowedTypes.includes(file.mimetype)) {
                    throw new ApiError(
                        400,
                        "Cover image must be a JPEG, PNG, WEBP file"
                    );
                }

                return true;
            }),
    ];
};
