import pkg from "pg";
import { BD_HOST, BD_NAME, BD_PASS, BD_PORT, BD_USER } from "../config.js";

const { Client } = pkg;

const db = new Client({
  host: BD_HOST,
  port: BD_PORT,
  user: BD_USER,
  password: BD_PASS,
  database: BD_NAME,
});

//por si sale mal se hace una promesa para manejar el error
(async () => {
  try {
    await db.connect();
    console.log("base de datos conectada");
  } catch (error) {
    console.error(error);
  }
})();

export default db;
