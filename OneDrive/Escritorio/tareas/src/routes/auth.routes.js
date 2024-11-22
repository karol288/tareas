import { Router } from "express";
import {
  registro,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js";
import { authRequerida } from "../middlewares/validarToken.js";
import { validarSchema } from "../middlewares/validadorSchemas.middlewares.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";
const router = Router();

router.post("/registro", validarSchema(registerSchema), registro);
router.post("/login", validarSchema(loginSchema), login);
router.post("/logout", logout); //cerrar sesion
router.get("/profile", authRequerida, profile); //perfil

export default router;
