const express = require("express");
const router = express.Router();
const { db, auth,admin } = require("../../firebaseConfig");
const cloudinary = require("../../cloudinaryConfig");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

router.post("/create-user", async (req, res) => {
  const { phoneNumber, cnic, name } = req.body;

  if (!/^\+?\d{12}$/.test(phoneNumber)) {
    return res.status(400).json({ message: "Phone number must be 13 digits with an optional '+' at the start." });
  }  

  if (!/^\d{13}$/.test(cnic)) {
    return res.status(400).json({ message: "CNIC must be 16 digits." });
  }

  if (name.length <= 2 || /\d/.test(name)) {
    return res.status(400).json({ message: "Name must be greater than 2 letters and cannot contain numbers." });
  }

  try {
    const usersCollectionRef = db.collection("users");
    const userDoc = await usersCollectionRef.doc(phoneNumber).get();

    if (userDoc.exists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const userRecord = await auth.createUser({
      phoneNumber: phoneNumber,
    });

    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    await usersCollectionRef.doc(phoneNumber).set({
      cnic: cnic,
      name: name,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      isVerified: true,
      isOccupiedByUser: false,
      timestamp: new Date(),
      profile: {},
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

router.post("/upload-report", upload.array("files[]", 10), async (req, res) => {
  const { phoneNumber, relationship, name, reports } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No PDF files uploaded" });
  }

  if ( !name || !relationship || !phoneNumber || !reports) {
    return res
      .status(400)
      .json({ message: "PhoneNumber/Relationship/Name missing" });
  }

  try {
 
    const uploadPromises = req.files.map(async (file, index) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      const result = await cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "reports",
          public_id: `reports/${phoneNumber}/${fileName}`,
        },
        async (error, uploadedFile) => {
          if (error) {
            throw new Error(`Cloudinary upload failed: ${error.message}`);
          }
          const newReport = {
            reportPdf: uploadedFile.secure_url,
            reportName: reports[index],
          };

          await db.collection("users").doc(phoneNumber).update({
            [`profile.${relationship}.reports`]: admin.firestore.FieldValue.arrayUnion(newReport),
            [`profile.${relationship}.name`]: name,
            [`profile.${relationship}.phoneNumber`]: phoneNumber,
          });
        }
      );

      result.end(file.buffer);
    });

    await Promise.all(uploadPromises);

    res.status(200).json({
      message: "All PDFs uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
