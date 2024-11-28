import {
  crearUsuario,
  EncontrarUsuarioEmail,
  EncontrarUsuarioID,
  updateUserImagen,
} from "../models/usuario.models.js";
import bcrypt from "bcryptjs"; //para incriprtar la contraseña
import { creacionToken } from "../libs/jwt.js"; //para en token
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const registro = async (req, res) => {
  try {
    const { nombre, password, email } = req.body; //datos que el dato envia en la peticion

    const usuariofound = await EncontrarUsuarioEmail(email);
    if (usuariofound) return res.status(400).json(["email ya esta en uso "]);

    const passwordHash = await bcrypt.hash(password, 10); //el hash es para como tal incriptar la contraseña pasar la contraseña a un numero de letras

    const usuario = await crearUsuario(
      { email, nombre, password: passwordHash }
      //await para que se realice esta consulta
    );
    console.log(usuario);
    const token = await creacionToken({ id: usuario.id_usuarios });
    res.cookie("token", token); // la cookie es para guardar el token
    //respuesta
    res.json({ message: "usuario creado satisfactoriamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); //maneja el error mustra mensaje error
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body; //datos que el dato envia en la peticion
  try {
    const usuarioEncontrado = await EncontrarUsuarioEmail(email);
    console.log(usuarioEncontrado);

    if (!usuarioEncontrado)
      return res.status(400).json({ message: "usuario no encontrado " }); // por si no se encuentra el usuario

    const siCoincide = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    ); //compare para comparar una entre la otra
    // console.log("Password ingresada:", password);
    // console.log("Password en la base de datos:", usuarioEncontrado.password);

    if (!siCoincide)
      return res.status(400).json({ message: "contraseña incorrecta" });

    const token = await creacionToken({ id: usuarioEncontrado.id_usuarios });

    res.cookie("token", token); // la cookie es para guardar el token

    res.json({
      // id: usuarioEncontrado.id_usuarios,
      // nombre: usuarioEncontrado.nombre,
      // email: usuarioEncontrado.email,
      message: "ingresaste correctamente",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message }); //maneja el error mustra mensaje error
  }
};

//para cerrar sesion
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

//profile : perfil
export const profile = async (req, res) => {
  console.log(req.usuario);
  try {
    const usuarioEncontrado = await EncontrarUsuarioID(req.usuario.id);

    if (!usuarioEncontrado)
      return res.status(400).json({ message: "usuario no encontrado " });

    return res.json({
      id: usuarioEncontrado.id_usuarios,
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }

  res.send("profile");
};

export const subir_imagen = async (req, res) => {
  try {
    const { file } = req;
    console.log(file);

    const usuarioEncontrado = await EncontrarUsuarioID(req.usuario.id);

    if (!usuarioEncontrado)
      return res.status(400).json({ message: "usuario no encontrado " });

    await updateUserImagen(
      req.usuario.id, //para el usuario ya autenticado
      `http://localhost:4000/public/${file.filename}`
      // const imageUrl = `${process.env.URL_BASE}/public/${file.filename}`;
    );

    return res.json({ message: "La imagen se subio satisfactoriamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//verificar el token
export const verificarToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "no autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (error, usuario) => {
    if (error) return res.status(401).json({ message: "no autorizado" });

    const usuarioEncontrado = await EncontrarUsuarioID(req.usuario.id);
    if (!usuarioEncontrado)
      return res.status(401).json({ message: "no autorizado" });

    return res.json({
      id: usuarioEncontrado.id_usuarios,
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
    });
  });
};
