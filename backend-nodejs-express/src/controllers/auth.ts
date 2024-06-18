import { Request, Response } from "express";
import { httpError } from "../utils/error.handle";
import {
  loginUser,
  logoutUser,
  recoverPassword,
  registerUser,
  verifyEmail,
} from "../services/authService";

const loginCtrl = async (req: Request, res: Response) => {
  try {
    const { usuario, password } = req.body;
    const result = await loginUser(usuario, password);
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const registerCtrl = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const logoutCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await logoutUser(Number(id));
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const verficarEmailCtrl = async (req: Request, res: Response) => {
  try {
    const { correo } = req.body;
    const result = await verifyEmail(correo);
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const recuperarContrasenaCtrl = async (req: Request, res: Response) => {
  try {
    const { correo, codigo } = req.body;
    const result = await recoverPassword(correo, codigo);
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

export {
  loginCtrl,
  registerCtrl,
  logoutCtrl,
  verficarEmailCtrl,
  recuperarContrasenaCtrl,
};
