import { Router } from "express";
import { loginCtrl, logoutCtrl, recuperarContrasenaCtrl, registerCtrl, verficarEmailCtrl } from "../controllers/auth";
import { validateUsuario } from "../validators/usuario";


const routeAuth = Router();
routeAuth.post("/login", loginCtrl);
routeAuth.post("/register", validateUsuario, registerCtrl);
routeAuth.post("/logout/:id", logoutCtrl);
routeAuth.post("/verify-email", verficarEmailCtrl);
routeAuth.post("/reset-password", recuperarContrasenaCtrl);   


export { routeAuth };