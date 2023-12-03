// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const statuseModel = db.define("status", {
  idstatuses: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nombre: { type: DataTypes.STRING },
});

export default statuseModel;
