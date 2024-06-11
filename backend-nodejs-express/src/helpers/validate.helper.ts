import  { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        if (err instanceof Error && 'array' in err) {
            res.status(403);
            res.send({ errors: (err as any).array().map((e: any) => e.msg) });
        } else {
            throw err;
        }
    }
};

export { validateResult };