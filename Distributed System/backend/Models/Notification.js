const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Link to the post (if applicable)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // Add user reference
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);
