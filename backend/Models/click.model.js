const mongoose = require("mongoose");

const ClickEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: "Link", required: true },
    type: { type: String, enum: ["social", "shop", "cta"], required: true },
    deviceType: { type: String, enum: ["Windows", "Mac", "Linux", "Android", "iOS", "Other"], required: true },
    platform: { type: String, enum: ["YouTube", "Instagram", "Facebook", "X","Other"], required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClickEvent", ClickEventSchema);
