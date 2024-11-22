import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// next es para que continue si el token es valido si no, no
export const authRequerida = (req, res, next) => {
  const { token } = req.cookies; //para obtener el token de las cookies

  if (!token)
    return res.status(401).json({ message: "no hay token, no autorizado " }); // el error 401 es para no autorizado

  jwt.verify(token, TOKEN_SECRET, (error, usuario) => {
    if (error) return res.status(403).json({ message: "token invalido " }); //si muestra error

    req.usuario = usuario; //usuario va a contener los datos que estan dentro del token y aca se almacena ya el usuario guardado
  });

  next(); //para que continue con la otra funcion
};
