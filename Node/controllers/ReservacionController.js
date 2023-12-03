//importamos el modelo
import reservacionModel from "../models/ReservacionModel.js";
import habitacionModel from "../models/HabitacionModel.js";
import usuarioModel from "../models/UsuarioModel.js";
import statuseModel from "../models/StatuseModel.js";
export const getAllReservacions = async (req, res) => {
  try {
    const reservacions = await reservacionModel.findAll({
      include: [
        { model: usuarioModel, as: "usuario" },
        { model: habitacionModel, as: "habitacion" },
        { model: statuseModel, as: "status" },
      ],
    });
    res.json(
      reservacions.map((reservacion) => ({
        idreservacions: reservacion.idreservacions,
        nombreUsuario: reservacion.usuario.nombre,
        codHab: reservacion.habitacion.codHab,
        nombreHabitacion: reservacion.habitacion.nombre,
        costoHabitacion: reservacion.habitacion.costo,
        numPersonas: reservacion.habitacion.numPersonas,
        fecInic: reservacion.fecInic,
        fecFin: reservacion.fecFin,
        status: reservacion.status.nombre,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getReservacion = async (req, res) => {
  try {
    const reservacion = await reservacionModel.findAll({
      where: { idreservacions: req.params.id },
    });
    res.json(reservacion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createReservacion = async (req, res) => {
  try {
    await reservacionModel.create(req.body);
    res.json({
      message: "Reservacion creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateReservacion = async (req, res) => {
  try {
    await reservacionModel.update(req.body, {
      where: { idreservacions: req.params.id },
    });
    res.json({
      message: "Reservacion actualizada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteReservacion = async (req, res) => {
  try {
    await reservacionModel.destroy({
      where: { idreservacions: req.params.id },
    });
    res.json({
      message: "Reservacion eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
