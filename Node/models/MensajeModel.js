// importamos la conexion de la bd
import db from "../database/db.js";


//importamos sequelize
import { DataTypes } from "sequelize";

const mensajeModel = db.define("mensaje", {
  idmensajes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },


  nombre: { type: DataTypes.STRING },
  telefono: { type: DataTypes.STRING },
  correo: { type: DataTypes.STRING },
  mensaje: { type: DataTypes.STRING },
  genero: { type: DataTypes.STRING },
});



export default mensajeModel;
