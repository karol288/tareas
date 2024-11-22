import express from "express";
import morgan from "morgan"; //mostrar cada accion de refresco
import cookieParser from "cookie-parser"; // para leer las cookies
import cors from "cors";
import { URL_FRONT } from "./config.js";

import authRoutes from "./routes/auth.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
const app = express();

app.use(
  cors({
    origin: URL_FRONT,
  })
);
app.use(morgan("dev")); //muestra la peticion por consola
app.use(express.json()); // para que reciba los datos en formato json
app.use(cookieParser());
app.use("/api", authRoutes); //incluye todas las rutas del archivo auth.routes y se coloca api para entrar en el backend
app.use("/api", tareasRoutes);

export default app;
