import {
  crearTarea,
  tareaPorIdUsuario,
  tareaPorIdTarea,
  eliminarTarea,
  cambiarTarea,
} from "../models/tareas.models.js";

export const getTareas = async (req, res) => {
  try {
    const tareas = await tareaPorIdUsuario(req.usuario.id); // le esta pasando el id del token ya autenticado
    res.json(tareas);
    console.log(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const insertTarea = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_finalizacion, estado } = req.body;
    console.log(req.usuario);

    const nuevaTarea = await crearTarea({
      id_usuario: req.usuario.id,
      titulo,
      descripcion,
      fecha_finalizacion,
      estado,
    });
    console.log(nuevaTarea);
    res.json({ message: "tarea creada" });
  } catch (error) {
    console.error("error al querer crear una tarea", error);
  }
};

export const getTarea = async (req, res) => {
  try {
    const tarea = await tareaPorIdTarea(req.params.id);
    if (!tarea) return res.status(404).json({ message: "tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTarea = async (req, res) => {
  try {
    const tarea = await eliminarTarea(req.params.id);
    console.log(tarea);

    if (!tarea) return res.status(404).json({ message: "tarea no encontrada" });
    res.status(200).json({ message: "tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al intentar eliminar la tarea" });
  }
};

export const updateTarea = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_finalizacion, estado } = req.body;
    console.log(titulo);

    const tarea = await tareaPorIdTarea(req.params.id);
    console.log(tarea);

    if (!tarea)
      return res.status(404).json({ message: "tarea no encontrada " }); //verifica si la tarea existe

    const tareaActualizada = await cambiarTarea(req.params.id, {
      //el req.param.id va a recibir el id de la tarea
      titulo: titulo ? titulo : tarea.titulo, //aca mira si coloca titulo lo pone y cambia la tarea si no va a poner el titulo que ya estaba anteriormente
      descripcion: descripcion ? descripcion : tarea.descripcion,
      fecha_finalizacion: fecha_finalizacion
        ? fecha_finalizacion
        : tarea.fecha_finalizacion,
      estado: estado ? estado : tarea.estado,
    });
    console.log(tareaActualizada);
    res.json({ message: "tarea actualizada" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "hubo un error en el servidor" });
  }
};

// ctrl + d selecciona todo
//doble click y ctrl
