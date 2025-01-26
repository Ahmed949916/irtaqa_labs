require("dotenv").config(); // Load environment variables

const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const serviceAccount = require("./irtaqa-labs-firebase-adminsdk-fbsvc-200954fc24.json");

// Firebase Client SDK Configuration (if needed for frontend tasks)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase Client SDK
const app = initializeApp(firebaseConfig);

// Initialize Firebase Admin SDK (for backend operations)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Ensure storage bucket in .env
  });
}

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, db, app, auth };
