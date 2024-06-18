
import { Request, Response, NextFunction } from 'express';
import { check } from "express-validator";
import { validateResult } from "../helpers/validate.helper";

const validateProducto = [
    check('nombre')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío'),
    check('precio')
        .exists().withMessage('El precio es requerido')
        .isNumeric().withMessage('El precio debe ser un número'),
    check('stock')
        .exists().withMessage('El stock es requerido')
        .isNumeric().withMessage('El stock debe ser un número'),
    check('descripcion')
        .exists().withMessage('La descripción es requerida')
        .not().isEmpty().withMessage('La descripción no puede estar vacía'),
    check('imagen')
        .exists().withMessage('La imagen es requerida')
        .not().isEmpty().withMessage('La imagen no puede estar vacía'),
        (req: Request, res: Response, next: NextFunction) => {
            validateResult(req, res, next);
         }
];

export { validateProducto };