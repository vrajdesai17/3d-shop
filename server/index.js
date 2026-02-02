import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/database.js';
import dalleRoutes from './routes/dalle.routes.js';
import authRoutes from './routes/auth.routes.js';
import designRoutes from './routes/design.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Connect to database
connectDB();

// Routes
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/designs", designRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "3D Shop API" });
});

app.listen(8080, () => console.log('Server has started on port 8080'));