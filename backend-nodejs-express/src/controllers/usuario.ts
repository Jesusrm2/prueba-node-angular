import { httpError } from "../utils/error.handle";
import { Usuario } from "../models/usuario";
import { Request, Response } from "express";
import { Sesion } from "../models/sesion";
import {
  dashboard,
  deleteUsuario,
  getAllUsuarios,
  getByOneUsuario,
  updateUsuario,
  welcome,
} from "../services/usuarioService";

const getUsuarioByIdCrtl = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await getByOneUsuario(id);
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const getAllUsuariosCrtl = async (req: Request,res: Response) => {
  try {
    const result = await getAllUsuarios();
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const updateUsuarioCrtl = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const userUpdate = await updateUsuario(id, body);
    res.status(userUpdate.status).send(userUpdate.data || userUpdate.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const deleteUsuarioCrtl = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await deleteUsuario(id);
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const welcomeCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await welcome(id);
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const dashboardCtrl = async (req: Request, res: Response) => {
  try {
    const result = await dashboard();
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const executeProcedure = async (req: Request, res: Response) => {
  try {
    const result = await Usuario.query(`CALL crear_roles_y_admin()`);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

export {
  getUsuarioByIdCrtl,
  getAllUsuariosCrtl,
  updateUsuarioCrtl,
  deleteUsuarioCrtl,
  welcomeCtrl,
  dashboardCtrl,
  executeProcedure,
};
