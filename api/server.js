import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateTaskHandler } from './generate-task.js';
import { provideFeedbackHandler } from './provide-feedback.js';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/generate-task', generateTaskHandler);
app.post('/api/provide-feedback', provideFeedbackHandler);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});