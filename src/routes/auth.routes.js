import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
    userLoginValidator,
    userRegisterValidator,
} from "../validators/validator-functions.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

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

router.route("/login").post(userLoginValidator(), validate, loginUser);

// Secured routes (JWT required)
router.use(verifyJWT);

router.route("/logout").post(logoutUser);

export default router;
