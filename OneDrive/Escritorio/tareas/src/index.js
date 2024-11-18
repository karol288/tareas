import app from "./app.js";
import { PORT } from "./config.js";
import "./database/db.js";

app.listen(PORT);
console.log(`servidor escuchando en el puerto ${PORT}`);
