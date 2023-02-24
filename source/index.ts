import app from './app';
import http from 'http';
import * as dotenv from 'dotenv';
import logger from './utils/winston';
import {Prisma }from './utils/db';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// start db
const prisma = new Prisma();
prisma.connectDB();
 

const port = process.env.PORT || 3000;
const startServer = () => {
  const server: http.Server = app.listen(port, () => {
    logger.info(`Listening on url http://localhost:${port}`);
    return server;
  });
};

startServer();
