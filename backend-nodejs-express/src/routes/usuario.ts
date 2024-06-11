import { Router } from "express";
import { dashboardCtrl, deleteUsuarioCrtl, executeProcedure, getAllUsuariosCrtl, getUsuarioByIdCrtl, updateUsuarioCrtl, welcomeCtrl } from "../controllers/usuario";
import { validateResult } from "../helpers/validate.helper";


const routeUsuario = Router();
routeUsuario.route('/usuario/:id')
    .get(getUsuarioByIdCrtl)
    .put(validateResult,updateUsuarioCrtl)
    .delete(deleteUsuarioCrtl);
routeUsuario.get('/usuario/welcome/:id', welcomeCtrl);
routeUsuario.get('/usuarios', getAllUsuariosCrtl);
routeUsuario.get('/usuarios/sesiones', dashboardCtrl);
routeUsuario.post('/usuarios/store-prcedure', executeProcedure);

export { routeUsuario };