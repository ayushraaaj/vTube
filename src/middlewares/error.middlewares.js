import mongoose from "mongoose";
import { ApiError } from "../utils/api-error.js";

export const errorHandler = (err, req, res, next) => {
    if (!(err instanceof ApiError)) {
        const statusCode =
            err.statusCode || (err instanceof mongoose.Error ? 400 : 500);

        const message = err.message || "Something went wrong";

        err = new ApiError(statusCode, message, err.errors || [], err.stack);
    }

    const response = {
        success: false,
        message: err.message,
        errors: err.errors || [],
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    };

    return res.status(err.statusCode).json(response);
};
