import jwt from "jsonwebtoken"; //para en token
import { TOKEN_SECRET } from "../config.js";

export function creacionToken(payload) {
  return new Promise((resolve, reject) => {
    // el return es para que al llamar la funcion creacionToken el me va a retornar la promesa
    //resolve por si sale bien reject por si sale mal el new promise es global
    jwt.sign(
      payload, // lo que voy a guardar es decir lo que va a pasar el usuario el registro
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}
