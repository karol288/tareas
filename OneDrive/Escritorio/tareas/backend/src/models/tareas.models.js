import db from "../database/db.js";

export const crearTarea = async ({
  id_usuario,
  titulo,
  descripcion,
  fecha_finalizacion,
  estado,
}) => {
  try {
    const {
      rows: [tareas], //estamos sacando tareas de un grupo de datos
    } = await db.query(
      //lo que le vamos a pasar a usuario se usa await para que el programa espere hasta que este insert este listo
      "INSERT INTO tareas (id_usuario,titulo, descripcion, fecha_finalizacion, estado ) VALUES ($1, $2, $3, $4, $5)RETURNING *", //espera hasta que este listo
      [id_usuario, titulo, descripcion, fecha_finalizacion, estado]
    );

    return tareas; //mostrara la tarea creada
  } catch (error) {
    console.error(error);
  }
};

export const tareaPorIdUsuario = async (id_usuario) => {
  try {
    const {
      rows: tareas, // se usa solo rows para traer todas las tareas y no unicamente una
    } = await db.query("SELECT * FROM tareas WHERE id_usuario = $1 ", [
      id_usuario,
    ]);
    return tareas; // me va a devolver las tareas que estan dentro de rows
  } catch (error) {
    console.error(
      "hubo un error al encontrar la tarea por el id_usuario: ",
      error
    );
  }
};

export const tareaPorIdTarea = async (id_tarea) => {
  try {
    const {
      rows: [tareas],
    } = await db.query("SELECT * FROM tareas WHERE id_tarea = $1 ", [id_tarea]);
    return tareas;
  } catch (error) {
    console.error("hubo un error al encontrar la tarea por el id", error);
  }
};

export const eliminarTarea = async (id_tarea) => {
  try {
    const { rowCount } = await db.query(
      "DELETE FROM tareas WHERE id_tarea =$1",
      [id_tarea]
    );
    if (rowCount > 0) return { message: "Tarea eliminada correctamente" }; // para saber que la tarea o las tareas fueron eliminadas
    return rowCount;
  } catch (error) {
    console.error("hubo un error al eliminar la tarea", error);
  }
};

export const cambiarTarea = async (
  id_tarea,
  { titulo, descripcion, fecha_finalizacion, estado }
) => {
  try {
    const {
      rows: [tareas],
    } = await db.query(
      "UPDATE tareas SET  titulo = $2, descripcion = $3, fecha_finalizacion = $4, estado= $5 WHERE id_tarea = $1 RETURNING *",
      [id_tarea, titulo, descripcion, fecha_finalizacion, estado]
    );
    return tareas;
  } catch (error) {
    console.error("hubo un error al cambiar la tarea", error);
  }
};
