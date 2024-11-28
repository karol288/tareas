import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, //para que establasca las cookies aqui
});

export default instance;
