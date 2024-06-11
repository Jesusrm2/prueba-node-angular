import { Response } from 'express';

const httpError = (res: Response, error: string, errorRaw?: any) => {
    console.log(errorRaw);
    res.status(500);
    res.send({ error });
  };
  
export { httpError }