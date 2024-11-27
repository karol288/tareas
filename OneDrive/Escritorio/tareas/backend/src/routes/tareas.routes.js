import { Router } from "express";
import { authRequerida } from "../middlewares/validarToken.js";
import {
  getTarea,
  getTareas,
  insertTarea,
  updateTarea,
  deleteTarea,
} from "../controllers/tareas.controllers.js";
import { validarSchema } from "../middlewares/validadorSchemas.middlewares.js";
import { crearTareaSchema } from "../schemas/tareas.schemas.js";
const router = Router();

router.get("/tareas", authRequerida, getTareas); //seleciona todo
router.get("/tareas/:id", authRequerida, getTarea); //selecciona uno
router.post(
  "/tareas",
  authRequerida,
  validarSchema(crearTareaSchema),
  insertTarea
);
router.delete("/tareas/:id", authRequerida, deleteTarea);
router.put("/tareas/:id", authRequerida, updateTarea);

export default router;
