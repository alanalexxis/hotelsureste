import express from "express";
import {
  createHabitacion,
  deleteHabitacion,
  getAllHabitacions,
  getHabitacion,
  updateHabitacion,
} from "../controllers/HabitacionController.js";

const router = express.Router();

router.get("/", getAllHabitacions);
router.get("/:id", getHabitacion);
router.post("/", createHabitacion);
router.put("/:id", updateHabitacion);
router.delete("/:id", deleteHabitacion);

export default router;
