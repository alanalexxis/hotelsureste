//importamos el modelo
import habitacionModel from "../models/HabitacionModel.js";

export const getAllHabitacions = async (req, res) => {
  try {
    const habitacions = await habitacionModel.findAll({});
    res.json(
      habitacions.map((habitacion) => ({
        idhabitacions: habitacion.idhabitacions,
        codHab: habitacion.codHab,
        nombre: habitacion.nombre,
        costo: habitacion.costo,
        numPersonas: habitacion.numPersonas,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getHabitacion = async (req, res) => {
  try {
    const habitacion = await habitacionModel.findAll({
      where: { idhabitacions: req.params.id },
    });
    res.json(habitacion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createHabitacion = async (req, res) => {
  try {
    await habitacionModel.create(req.body);
    res.json({
      message: "Habitacion creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateHabitacion = async (req, res) => {
  try {
    await habitacionModel.update(req.body, {
      where: { idhabitacions: req.params.id },
    });
    res.json({
      message: "Habitacion actualizada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteHabitacion = async (req, res) => {
  try {
    await habitacionModel.destroy({
      where: { idhabitacions: req.params.id },
    });
    res.json({
      message: "Habitacion eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
