// Autor: Ricardo Chaves Campos

import { Router } from "express";
import { getDispositivos, createDispositivo } from "../controllers/dispositivos.controller.js";
import { validarSesion } from "../middlewares/auth.middleware.js";
import { validateCreateDispositivo } from "../validators/dispositivos.validator.js";

const router = Router();

router.get('/', validarSesion, getDispositivos);

router.post('/', validarSesion, validateCreateDispositivo, createDispositivo);

export default router;