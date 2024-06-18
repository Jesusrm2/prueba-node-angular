import { Router } from "express";
import { updateProductoCrtl, deleteProductoCrtl, getAllProductosCrtl } from "../controllers/producto";
import { checkJwt } from "../middleware/session";
import { validateProducto } from "../validators/producto";


const routerProducto = Router();
routerProducto.route('/producto/:id')
    .put(checkJwt, validateProducto,updateProductoCrtl)
    .delete(checkJwt,deleteProductoCrtl);
routerProducto.get('/productos',checkJwt, getAllProductosCrtl);
routerProducto.post('/producto',checkJwt, validateProducto, updateProductoCrtl);

export { routerProducto };