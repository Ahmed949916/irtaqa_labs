const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); 
const adminRoutes = require("./routes/admin/adminRoute");
const authRoutes = require("./routes/auth/authRoute");
const userRoutes = require("./routes/user/userRoute");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
