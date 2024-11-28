import { Router } from "express";
import {
  registro,
  login,
  logout,
  profile,
  subir_imagen,
  verificarToken,
} from "../controllers/auth.controllers.js";
import { authRequerida } from "../middlewares/validarToken.js";
import { validarSchema } from "../middlewares/validadorSchemas.middlewares.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";
import { upload } from "../libs/imagen.js";

const router = Router();

router.post("/registro", validarSchema(registerSchema), registro);
router.post("/login", validarSchema(loginSchema), login);
router.post("/logout", logout); //cerrar sesion
router.post("/auth/verify", verificarToken);
router.get("/profile", authRequerida, profile); //perfil
router.post(
  "/upload-imagen",
  authRequerida,
  upload.single("file"),
  subir_imagen
); //subir foto de perfil

export default router;
