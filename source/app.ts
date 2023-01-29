import express from 'express';
import morgan from  'morgan';
import cors from  'cors';
import { ErrorHandler } from './middleware/error';
import { Application } from 'express';
import productRouter from './routers/product';
import authRouter from './routers/Auth';
import transactionRouter from './routers/transaction';

const app: Application = express();
   
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/transaction', transactionRouter);

app.use("*",ErrorHandler.pagenotFound());
app.use(ErrorHandler.handle());
ErrorHandler.exceptionRejectionHandler();


export default app