import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { userRegisterValidator } from "../validators/validator-functions.js";
import { validate } from "../middlewares/validator.middlewares.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    userRegisterValidator(),
    validate,
    registerUser
);

export default router;
