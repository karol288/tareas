import db from "../database/db.js";

export const crearUsuario = async ({ nombre, password, email }) => {
  try {
    const {
      rows: [usuario], //estamos sacando usuario de un grupo de datos
    } = await db.query(
      //lo que le vamos a pasar a usuario se usa await para que el programa espere hasta que este insert este listo
      "INSERT INTO usuarios (Nombre, password, email ) VALUES ($1, $2, $3 ) RETURNING *", //espera hasta que este listo
      [nombre, password, email]
    );

    return usuario; //mostrara el usuario creado
  } catch (error) {
    console.error(error);
  }
};

export const EncontrarUsuarioEmail = async (email) => {
  try {
    const {
      rows: [usuario], //estamos sacando usuario de un grupo de datos
    } = await db.query(
      //lo que le vamos a pasar a usuario se usa await para que el programa espere hasta que este insert este listo
      "SELECT *FROM usuarios where email = $1", //espera hasta que este listo
      [email]
    );

    return usuario; //mostrara el usuario creado
  } catch (error) {
    console.error(error);
  }
};

export const EncontrarUsuarioID = async (id) => {
  try {
    const {
      rows: [usuario], //estamos sacando usuario de un grupo de datos
    } = await db.query(
      //lo que le vamos a pasar a usuario se usa await para que el programa espere hasta que este insert este listo
      "SELECT *FROM usuarios where id_usuarios = $1", //espera hasta que este listo
      [id]
    );

    return usuario; //mostrara el usuario creado
  } catch (error) {
    console.error("Error al buscar el usuario por el ID:", error);
  }
};
