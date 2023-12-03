import express from "express";
import {
  createReservacion,
  deleteReservacion,
  getAllReservacions,
  getReservacion,
  updateReservacion,
} from "../controllers/ReservacionController.js";

const router = express.Router();

router.get("/", getAllReservacions);
router.get("/:id", getReservacion);
router.post("/", createReservacion);
router.put("/:id", updateReservacion);
router.delete("/:id", deleteReservacion);

export default router;
