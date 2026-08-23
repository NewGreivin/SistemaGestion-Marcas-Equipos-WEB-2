// Autor: Ricardo Chaves Campos

import * as marcasService from "../services/marcas.service.js";
import { exito, error } from "../utils/respuestaJson.js";

export const getUltimaMarca = async (req, res) => {
    try {
        const marca =
            await marcasService.getUltimaMarca(
                req.usuario.id
            );

        return exito(
            res,
            'Ultima marca recuperada exitosamente.',
            marca
        );
    } catch (err) {
        return error(
            res,
            'Error al obtener la ultima marca',
            err
        );
    }
};

export const createMarca = async (req, res) => {
    try {
        const usuario_id = req.usuario.id;

        const dispositivo_id = req.body.dispositivo_id;

        const direccion_ip = req.ip;

        if (!dispositivo_id) {
            throw new Error(
                "Debe seleccionar un dispositivo"
            );
        }

        const marca =
            await marcasService.createMarca(
                usuario_id,
                dispositivo_id,
                direccion_ip
            );

        return exito(
            res,
            'Marca registrada exitosamente.',
            marca,
            201
        );
    } catch (err) {
        return error(
            res,
            'Error al registrar la marca',
            err
        );
    }
};
