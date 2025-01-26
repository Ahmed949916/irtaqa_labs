const express = require("express");
const router = express.Router();
const { db } = require("../../firebaseConfig");
const bcrypt = require("bcrypt");

// User login with phone number and password
router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const userDoc = await db.collection("users").doc(phoneNumber).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res
      .status(200)
      .json({ message: "Login successful, please change your password." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User changes password
router.post("/change-password", async (req, res) => {
  const { phoneNumber, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and mark as occupied
    await db.collection("users").doc(phoneNumber).update({
      password: hashedPassword,
      isOccupiedByUser: true,
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
