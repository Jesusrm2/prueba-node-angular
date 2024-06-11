import express from 'express';
import multerMiddleware from '../middleware/file';
import { readExcel } from '../middleware/read';
import { uploadExcelCrtl } from '../controllers/upload';

const routeUpload = express.Router();

routeUpload.post('/upload', multerMiddleware.single('file'), readExcel, uploadExcelCrtl);

export { routeUpload};