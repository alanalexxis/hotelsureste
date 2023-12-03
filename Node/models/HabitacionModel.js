// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const habitacionModel = db.define("habitacion", {
  idhabitacions: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  codHab: { type: DataTypes.STRING },
  nombre: { type: DataTypes.STRING },
  costo: { type: DataTypes.FLOAT },
  numPersonas: { type: DataTypes.INTEGER },
});

export default habitacionModel;
