import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import connectToDB from './utils/connectToDB.js';
import cors from 'cors';
import userRoute from './routes/profile.js';
import contentRoutes from './routes/content.js';
import postContentRoutes from './routes/postContent.js';

dotenv.config();

if (process.env.NODE_ENV !== 'test') {
    connectToDB(process.env.MONGODB_URL);
  }

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', userRoute);
app.use('/api/content', contentRoutes);
app.use('/api/postContent', postContentRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export {server };
export default app;
