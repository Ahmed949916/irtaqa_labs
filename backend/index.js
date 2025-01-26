const express = require("express");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/admin/adminRoute");
const authRoutes = require("./routes/auth/authRoute");
const userRoutes = require("./routes/user/userRoute");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
