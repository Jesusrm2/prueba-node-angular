

import { check } from "express-validator";
import { validateResult } from "../helpers/validate.helper";
import { Request, Response, NextFunction } from 'express';

const validateUsuario = [
    check('username')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 8, max: 20 }).withMessage('El nombre debe tener entre 8 y 20 caracteres')
        .matches(/^[A-Za-z0-9]+$/).withMessage('El nombre no puede contener signos')
        .matches(/\d/).withMessage('El nombre debe contener al menos un número')
        .matches(/[A-Z]/).withMessage('El nombre debe contener al menos una letra mayúscula'),
    check('apellidos')
        .exists().withMessage('Los apellidos son requeridos')
        .not().isEmpty().withMessage('Los apellidos no pueden estar vacíos'),
    check('nombres')
        .exists().withMessage('Los apellidos son requeridos')
        .not().isEmpty().withMessage('Los apellidos no pueden estar vacíos'),
    check('contrasena')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .not().contains(' ').withMessage('La contraseña no debe contener espacios')
        .matches(/\W/).withMessage('La contraseña debe contener al menos un signo'),
    check('identificacion')
        .exists().withMessage('La identificación es requerida')
        .isLength({ min: 10, max: 10 }).withMessage('La identificación debe tener 10 dígitos')
        .matches(/^[0-9]+$/).withMessage('La identificación solo puede contener números')
        .not().matches(/(\d)\1{3,}/).withMessage('La identificación no puede tener 4 veces seguidas el mismo número'),
    check('rolId')
        .exists().withMessage('El rol es requerido')
        .isInt().withMessage('El rol debe ser un número entero'),
    (req: Request, res: Response, next: NextFunction) => {
       validateResult(req, res, next);
    }
];

export { validateUsuario };