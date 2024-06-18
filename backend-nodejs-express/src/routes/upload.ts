import express from 'express';
import multerMiddleware from '../middleware/file';
import { readExcel } from '../middleware/read';
import { uploadExcelCrtl } from '../controllers/upload';
import { checkJwt } from '../middleware/session';

const routeUpload = express.Router();

routeUpload.post('/upload',checkJwt,multerMiddleware.single('file'), readExcel, uploadExcelCrtl);

export { routeUpload};