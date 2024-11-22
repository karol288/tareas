//va a validar los datos cuando sean enviados y antes de registrarsen en la base de datos
export const validarSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // va ir evaluando el schema de lo que llega en el req.body es que lo que ingresa el usuario
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) }); //aca este error va a recorrer el mensaje que tiene el objeto de error para que me simplifique este error
  }
};
