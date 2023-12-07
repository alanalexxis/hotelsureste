// importamos la conexion de la bd
import db from "../database/db.js";
import habitacionModel from "./HabitacionModel.js";
import statusModel from "./StatuseModel.js";
import usuarioModel from "./UsuarioModel.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const reservacionModel = db.define("reservacion", {
  idreservacions: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  fecInic: { type: DataTypes.DATE },
  fecFin: { type: DataTypes.DATE },
  total: { type: DataTypes.FLOAT },
});

reservacionModel.belongsTo(habitacionModel, {
  foreignKey: "idhabitacions",
  as: "habitacion",
});
reservacionModel.belongsTo(statusModel, {
  foreignKey: "idstatuses",
  as: "status",
});
reservacionModel.belongsTo(usuarioModel, {
  foreignKey: "idusuarios",
  as: "usuario",
});

export default reservacionModel;
