import express from "express";
import morgan from "morgan"; //mostrar cada accion de refresco
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(morgan("dev")); //muestra la peticion por consola
app.use(express.json()); // para que reciba los datos en formato json

app.use("/api", authRoutes); //incluye todas las rutas del archivo auth.routes y se coloca api para entrar en el backend

export default app;
