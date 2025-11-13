import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        channel: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: true,
    }
);

export const Subscription = mongoose.model("subscriptions", subscriptionSchema);
