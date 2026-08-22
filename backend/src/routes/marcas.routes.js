// Autor: Ricardo Chaves Campos

import { Router } from "express";
import { getUltimaMarca, createMarca } from "../controllers/marcas.controller.js";
import { validarSesion } from "../middlewares/auth.middleware.js"

const router = Router();

router.post("/", validarSesion, createMarca);

router.get("/ultima", validarSesion, getUltimaMarca);

export default router;
