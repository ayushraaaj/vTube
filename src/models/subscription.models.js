import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId, // You are the subscriber
            ref: "User",
        },
        channel: {
            type: Schema.Types.ObjectId, // Whom you are subscribing
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
