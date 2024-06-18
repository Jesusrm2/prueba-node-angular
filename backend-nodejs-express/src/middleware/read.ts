
import * as XLSX from "xlsx";
import { Request, Response, NextFunction } from "express";

export const readExcel = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).send("No se subió ningún archivo o el archivo no se cargó correctamente");
  }

  const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
  const sheetNameList = workbook.SheetNames;
  req.body.data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
  
  next();
};