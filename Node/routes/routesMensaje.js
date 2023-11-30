import express from "express";
import {
  createMensaje,
  deleteMensaje,
  getAllMensajes,
  getMensaje,
  updateMensaje,
} from "../controllers/MensajeController.js";

const router = express.Router();

router.get("/", getAllMensajes);
router.get("/:id", getMensaje);
router.post("/", createMensaje);
router.put("/:id", updateMensaje);
router.delete("/:id", deleteMensaje);

export default router;


