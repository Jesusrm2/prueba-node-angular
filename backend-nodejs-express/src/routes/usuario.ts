import { Router } from "express";
import { dashboardCtrl, deleteUsuarioCrtl, executeProcedure, getAllUsuariosCrtl, getUsuarioByIdCrtl, updateUsuarioCrtl, welcomeCtrl } from "../controllers/usuario";
import { validateResult } from "../helpers/validate.helper";
import { checkJwt } from "../middleware/session";


const routeUsuario = Router();
routeUsuario.route('/usuario/:id')
    .get(checkJwt,getUsuarioByIdCrtl)
    .put(checkJwt, validateResult,updateUsuarioCrtl)
    .delete(checkJwt,deleteUsuarioCrtl);
routeUsuario.get('/usuario/welcome/:id',checkJwt, welcomeCtrl);
routeUsuario.get('/usuarios',checkJwt, getAllUsuariosCrtl);
routeUsuario.get('/usuarios/sesiones',checkJwt, dashboardCtrl);
routeUsuario.post('/usuarios/store-prcedure',checkJwt, executeProcedure);

export { routeUsuario };