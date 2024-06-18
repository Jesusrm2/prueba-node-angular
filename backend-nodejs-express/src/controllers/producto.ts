import { createProducto, deleteProducto, getAllProductos, updateProducto } from "../services/productoService";
import { Request, Response } from "express";
import { httpError } from "../utils/error.handle";


const getAllProductosCrtl = async (req: Request, res: Response) => {
    try {
        const result = await getAllProductos();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const registerProductoCrtl = async (req: Request, res: Response) => {
    try {
        const result = await createProducto(req.body);
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const updateProductoCrtl = async ({params, body}: Request, res: Response) => {
    try {
        const { id } = params;
        const result = await updateProducto(id, body);
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const deleteProductoCrtl = async ({params}: Request, res: Response) => {
    try {
        const { id } = params;
        const result = await deleteProducto(id);
        res.status(result.status).send(result.message);
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}


export { registerProductoCrtl, updateProductoCrtl, deleteProductoCrtl, getAllProductosCrtl};