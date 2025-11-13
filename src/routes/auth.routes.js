import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
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

router.route("/refresh-token").post(refreshAccessToken);

// Secured routes (JWT required)
router.use(verifyJWT);

router.route("/logout").post(logoutUser);

router.route("/change-password").post(changeCurrentPassword);

router.route("/current-user").get(getCurrentUser);

router.route("/update-account").patch(updateAccountDetails);

router.route("/update-avatar").patch(upload.single("avatar"), updateUserAvatar);

router
    .route("/update-coverimage")
    .patch(upload.single("coverImage"), updateUserCoverImage);

router.route("/channel/:username").get(getUserChannelProfile);

router.route("/watch-history").get(getWatchHistory);

export default router;
