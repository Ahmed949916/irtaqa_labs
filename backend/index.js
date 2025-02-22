const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const adminRoutes = require("./routes/admin/adminRoute");
const authRoutes = require("./routes/auth/authRoute");
const userRoutes = require("./routes/user/userRoute");

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: "*", // Allow all origins (change this for security)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
