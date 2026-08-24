//Autor: Ricardo Chaves Campos  

import api from "../../../api/api";

//Obtener ultima marca
export const getUltimaMarca = async () => {

    try {
        const response = await api.get("/marcas/ultima");
        return response.data.data || response.data;
    } catch (error) {
        throw new Error (
            error.message || "No se puede obtener la ultima marca"
        )
    }

}

//Crear una marca
export const createMarca = async (dispositivo_id) => {

    try {
        const response = await api.post("/marcas", {
            dispositivo_id
        });
        return response.data.data || response.data;
    } catch (error) {
        throw new Error(
            error.message || "No se pudo registrar la marca"
        )
    }

}