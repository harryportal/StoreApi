import app from './app';
import * as dotenv from 'dotenv';
import logger from './utils/winston';
import {Prisma }from './utils/db';
import { Application } from 'express';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
 
class Server {
  private port = process.env.PORT || 8000;
  private app;
  private prisma = new Prisma();
  constructor(app: Application) {
      this.app = app;
  }

  start() {
      this.prisma.connectDB();
      this.app.listen(this.port, () => {
        logger.info(`Listening on url http://localhost:${this.port}`);
      })
  }
}

const server =  new Server(app);
server.start()
