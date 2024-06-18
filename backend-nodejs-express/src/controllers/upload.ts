import { Request, Response } from "express";
import { uploadService } from "../services/uploadService";


const uploadExcelCrtl = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const response = await uploadService(data);
    res.status(200).json(response);  
  } catch (e) {
    console.error(e);
    res.status(500).send("Error al procesar el archivo");
  }
};

export { uploadExcelCrtl };