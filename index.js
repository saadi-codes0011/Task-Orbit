const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const activityRoutes = require("./routes/activityRoutes"); 
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require("./routes/projectRoutes");
dotenv.config();
connectDB();

const app = express();
const cors = require('cors');
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/activity-logs", activityRoutes);
app.use('/api/user', userRoutes)
app.use("/api/projects", projectRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
