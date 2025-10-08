import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.coverImage?.[0]?.path;

    let avatar = "";
    if (avatarLocalPath) {
        try {
            avatar = await uploadOnCloudinary(avatarLocalPath);
        } catch (error) {
            throw new ApiError(500, "Failed to upload avatar");
        }
    }

    let coverImage = "";
    if (coverLocalPath) {
        try {
            coverImage = await uploadOnCloudinary(coverLocalPath);
        } catch (error) {
            throw new ApiError(500, "Failed to upload cover image");
        }
    }

    try {
        const user = await User.create({
            ...req.body,
            avatar: avatar?.url || "",
            coverImage: coverImage?.url || "",
        });

        const createdUser = await User.findById(user._id).select(
            "-watchHistory -refreshToken -password"
        );

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    { user: createdUser },
                    "Registration successful"
                )
            );
    } catch (error) {
        if (avatar) {
            await deleteFromCloudinary(avatar.public_id);
        }
        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id);
        }

        throw new ApiError(
            500,
            "Something went wrong while registering a user and images were deleted"
        );
    }
});
