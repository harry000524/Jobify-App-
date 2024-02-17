import 'express-async-errors';
// import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import notFoundMiddleware from './middleware/not-found.js';
import errorhandleMiddleware from './middleware/error-handle.js';
import authMiddleWare from './middleware/auth.js';
import authRouter from './routes/authRoute.js';
import jobRouter from './routes/jobRoute.js';
import connectDb from './db/connect.js';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
const ___dirName = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.static(path.resolve(___dirName, './client/build')));

// app.use(cors());

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome to Mern course' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job', authMiddleWare, jobRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(___dirName, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorhandleMiddleware);
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
