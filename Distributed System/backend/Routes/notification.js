const express = require("express");
const Notification = require("../Models/Notification");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .populate("user", "email _id"); // Populate user info

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve notifications" });
  }
});


// Delete notifications older than 7 days 
router.delete("/older", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const result = await Notification.deleteMany({ createdAt: { $lt: sevenDaysAgo } });

    if (result.deletedCount > 0) {
      res.json({ message: `${result.deletedCount} notifications deleted.` });
    } else {
      res.json({ message: "No notifications to delete." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notifications", error });
  }
});

router.delete("/all", async (req, res) => {
  try {
    const result = await Notification.deleteMany({});
    
    if (result.deletedCount > 0) {
      res.json({ message: `${result.deletedCount} notifications deleted.` });
    } else {
      res.json({ message: "No notifications to delete." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all notifications", error });
  }
});

module.exports = router;
