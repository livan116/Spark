const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["social", "shop","cta"], // Default is "social"
        default: "social",
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    platform: {
        type: String, // e.g., "Instagram", "YouTube", "Facebook"
        required: true,
    },
    clicks: {
        type: Number,
        default: 0, // Track the number of times a link is clicked
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;
