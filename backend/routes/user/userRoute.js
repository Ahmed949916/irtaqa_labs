const express = require("express");
const router = express.Router();
const { db, auth, bucket } = require("../../firebaseConfig");
const cloudinary = require("../../cloudinaryConfig");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

router.get("/get-report/:phoneNumber", async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const userDoc = await db.collection("users").doc(phoneNumber).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    res.status(200).json({
      phoneNumber: phoneNumber,
      reportUrl: userData.profile.reportPdf || "No report available",
      reportName: userData.profile.reportName || "No report uploaded",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching report", error: error.message });
  }
});

module.exports = router;
