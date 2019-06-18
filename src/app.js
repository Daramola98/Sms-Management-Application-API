import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';

const port = parseInt(process.env.PORT, 10) || 8080;

const initializeServer = () => {
  dotenv.config();
  const app = express();
  app.enable('trust proxy');

  app.use(cors({
    origin: true,
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  }));

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes to Restful API
  routes(app);

  app.use('*', (req, res) => res.status(404).json({ message: 'Unhandled route requested (404)' }));

  app.listen(process.env.PORT || port, () => {
    // eslint-disable-next-line no-console
    console.info(`Server running on port ${process.env.PORT || port}`);
  });
};

export default initializeServer;
