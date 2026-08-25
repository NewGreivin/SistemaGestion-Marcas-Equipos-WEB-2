// Autor: Ricardo Chaves Campos

import api from "../../../api/api";

// Obtener los dispositivos
export const getDispositivosUsuario = async () => {

    try {
        const response = await api.get("/dispositivos");
        return response.data.data || response.data;
    } catch (error) {
        throw new Error(
            error.message || "No se pudieron obtener los dispositivos."
        );
    }

};


// Crear un dispositivo
export const createDispositivo = async (dispositivo) => {
    try {
        const response = await api.post("/dispositivos", dispositivo);
        return response.data.data || response.data;
    } catch (error) {
        throw new Error(
            error.message || "No se pudo crear el dispositivo."
        );
    }
};


// Traer un dispositivo autorizado
export const getDispositivoAutorizado = async (identificador) => {
    try {
        const response = await api.get(`/dispositivos/${identificador}`);
        return response.data.data || response.data;
    } catch (error) {
        throw new Error(
            error.message || "El dispositivo no está autorizado."
        );
    }
};