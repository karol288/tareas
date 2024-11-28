import express from "express";
import morgan from "morgan"; //mostrar cada accion de refresco
import cookieParser from "cookie-parser"; // para leer las cookies
import cors from "cors";
import { URL_FRONT } from "./config.js";
import { dirname, join } from "path"; //join que junta dos carpetas src con la carpeta public y el dirname trae toda la ruta de app y la pone en el archivo
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Permitir cookies
  })
);

app.use("/public", express.static(join(__dirname, "public"))); //ver la imagen y donde se guardan las imagenes

app.use(morgan("dev")); //muestra la peticion por consola

app.use(express.json()); // para que reciba los datos en formato json

app.use(cookieParser());
app.use("/api", authRoutes); //incluye todas las rutas del archivo auth.routes y se coloca api para entrar en el backend
app.use("/api", tareasRoutes);

export default app;
