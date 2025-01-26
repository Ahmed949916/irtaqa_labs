const express = require("express");
const router = express.Router();
const { db, auth, bucket } = require("../../firebaseConfig");
const cloudinary = require("../../cloudinaryConfig");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
// Admin creates a user with phone number and generates a password
router.post("/create-user", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Step 1: Check if the users collection exists by fetching any document
    const usersCollectionRef = db.collection("users");
    const userDoc = await usersCollectionRef.doc(phoneNumber).get();

    if (userDoc.exists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Step 2: Create a new user in Firebase Authentication
    const userRecord = await auth.createUser({
      phoneNumber: phoneNumber,
    });

    // Step 3: Generate a password and store user in Firestore
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    await usersCollectionRef.doc(phoneNumber).set({
      password: hashedPassword,
      isVerified: true,
      isOccupiedByUser: false,
      timestamp: new Date(),
      profile: {
        relationship: "",
        reportPdf: "",
        reportName: "",
        age: "",
      },
    });

    res.status(201).json({
      message: "User created successfully. Provide the password manually.",
      initialPassword: generatedPassword,
      userId: userRecord.uid,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

router.post("/upload-report", upload.single("file"), async (req, res) => {
  const { phoneNumber, relationship, age } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No PDF file uploaded" });
  }

  if (!phoneNumber || !relationship) {
    return res
      .status(400)
      .json({ message: "Phone number or Relationship missing" });
  }

  try {
    // Naming convention: phoneNumber-relationship.pdf
    const fileName = `${phoneNumber}-${relationship}.pdf`;

    // Upload to Cloudinary in 'reports/' folder
    cloudinary.uploader
      .upload_stream(
        {
          folder: "reports",
          public_id: fileName,
          resource_type: "raw", // To store PDFs as raw files
        },
        async (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ message: "Cloudinary upload failed", error });
          }

          // Store the PDF URL and details in Firestore
          await db.collection("users").doc(phoneNumber).update({
            "profile.reportPdf": result.secure_url,
            "profile.reportName": fileName,
            "profile.relationship": relationship,
            "profile.age": age,
          });

          res.status(200).json({
            message: "PDF uploaded successfully",
            reportUrl: result.secure_url,
          });
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
