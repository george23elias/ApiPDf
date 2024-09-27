import { Router } from "express";
import pool from "../controllers/Conexion.js";
import {
  actualizarUsers,
  agregarUsers,
  borrarUsers,
  getUsers,
  obtenerUsers,
} from "../controllers/User.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", obtenerUsers);
router.post("/users", agregarUsers);
router.delete("/users/:id", borrarUsers);
router.put("/users/:id", actualizarUsers);

export default router;
