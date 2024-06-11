import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routeAuth } from './routes/auth';
import { routeUsuario } from './routes/usuario';
import { routeUpload } from './routes/upload';



const app = express();
const apiAuthUrl = '/auth';
const apiUrl = '/api/v1';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(apiAuthUrl,routeAuth);
app.use(apiUrl,routeUsuario );
app.use(apiUrl,routeUpload );


export default app;