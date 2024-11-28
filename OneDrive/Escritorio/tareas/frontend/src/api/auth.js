//para hacer la peticion desde el front al backend
import axios from "./axios";

const API = "http://localhost:4000/api"; //conexion con la ruta del backend

export const registroPedido = (usuario) => axios.post(`/registro`, usuario); //le pasan un usario en usario => el va enviar una peticion post al /registro con el usuario que se le esta pasando

export const loginPedido = (usuario) => axios.post(`/login`, usuario);

export const verificarTokenPedido = () => axios.get("/auth/verify");
