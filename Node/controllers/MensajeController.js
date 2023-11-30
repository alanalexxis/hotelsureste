//importamos el modelo
import mensajeModel from "../models/MensajeModel.js";

export const getAllMensajes = async (req, res) => {
  try {
    const mensajes = await mensajeModel.findAll({
    
    });
    res.json(
      mensajes.map((mensaje) => ({
        idmensajes: mensaje.idmensajes,
      
        nombre: mensaje.nombre,
        telefono: mensaje.telefono,
     
        mensaje: mensaje.mensaje,
        genero: mensaje.genero,
       
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getMensaje = async (req, res) => {
  try {
    const mensaje = await mensajeModel.findAll({
      where: { idmensajes: req.params.id },
    });
    res.json(mensaje[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createMensaje = async (req, res) => {
  try {
    await mensajeModel.create(req.body);
    res.json({
      message: "Mensaje creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateMensaje = async (req, res) => {
  try {
    await mensajeModel.update(req.body, {
      where: { idmensajes: req.params.id },
    });
    res.json({
      message: "Mensaje actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteMensaje = async (req, res) => {
  try {
    await mensajeModel.destroy({
      where: { idmensajes: req.params.id },
    });
    res.json({
      message: "Mensaje eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


