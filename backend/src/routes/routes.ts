import { Router } from "express";
import { UsuariosController } from './../controllers/UsuariosController';
import { AuthController } from "../controllers/AuthController";

const routes = Router();

const usuariosController = new UsuariosController();
const authController = new AuthController();

routes.post("/login", authController.login)
routes.post("/usuarios", usuariosController.criarUsuario);
routes.get("/usuarios", usuariosController.listarTodos)

export default routes;