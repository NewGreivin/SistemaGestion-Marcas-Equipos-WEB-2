// Autor: Ricardo Chaves Campos

import * as marcasDao from "../daos/marcas.dao.js";
import { TIPOS_MARCA } from "../models/marca.model.js";

export const getUltimaMarca = async (usuario_id) => {
    return await marcasDao.findUltimaByUsuario(
        usuario_id
    );
};

export const createMarca = async (usuario_id, dispositivo_id, direccion_ip) => {
    const dispositivo = await marcasDao.findDispositivoByUsuario(
        dispositivo_id,
        usuario_id
    );

    if (!dispositivo) {
        throw new Error(
            "El dispositivo no existe o no pertenece al usuario."
        );
    }

    if (dispositivo.estado !== "ACTIVO") {
        throw new Error(
            "El dispositivo no está activo."
        );
    }

    const ultimaMarca = await marcasDao.findUltimaByUsuario(usuario_id);

    let tipo_marca = TIPOS_MARCA.ENTRADA;


    if (ultimaMarca) {

        if (
            ultimaMarca.tipo_marca === TIPOS_MARCA.ENTRADA
        ) {
            tipo_marca = TIPOS_MARCA.SALIDA;
        }

        if (
            ultimaMarca.tipo_marca === TIPOS_MARCA.SALIDA
        ) {
            tipo_marca = TIPOS_MARCA.ENTRADA;
        }
    }

    const nuevaMarca = {
        usuario_id: usuario_id,
        dispositivo_id: dispositivo_id,
        tipo_marca: tipo_marca,
        direccion_ip: direccion_ip
    };

    const insertId = await marcasDao.create(nuevaMarca);

    return await marcasDao.findById(insertId);
};