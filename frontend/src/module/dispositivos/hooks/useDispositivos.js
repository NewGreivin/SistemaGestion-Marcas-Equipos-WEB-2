import { useEffect, useState } from "react";

import { getDispositivoAutorizado, createDispositivo, getDispositivosUsuario } from "../services/dispositivos.service";

export default function useDispositivos() {

    const [dispositivos, setDispositivos] = useState([]);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const obtenerDispositivos = async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await getDispositivosUsuario();

            const dispositivosFormateados = data.map((dispositivo) => ({
                ...dispositivo,
                fecha_registro: formatearFecha(dispositivo.fecha_registro)
            }));

            setDispositivos(dispositivosFormateados);

            return dispositivosFormateados;

        } catch (error) {

            setError(error.message);
            throw error;

        } finally {

            setLoading(false);

        }
    };

    const crearDispositivo = async (dispositivo) => {

        if (!nombre.trim()) {
            setError("El nombre del dispositivo es requerido.");
            return;
        }

        try {

            setLoading(true);
            setError(null);

            await createDispositivo({
                nombre: nombre.trim(),
                descripcion: descripcion.trim()
            });

            const dispositivosActualizados = await getDispositivosUsuario();

            const dispositivosFormateados = dispositivosActualizados.map((dispositivo) => ({
                ...dispositivo,
                fecha_registro: formatearFecha(dispositivo.fecha_registro)
            }));

            setDispositivos(dispositivosFormateados);

            setNombre("");
            setDescripcion("");

        } catch (error) {

            setError(error.message);
            throw error;

        } finally {

            setLoading(false);

        }
    };

    const obtenerDispositivoAutorizado = async (identificador) => {

        try {

            setLoading(true);
            setError(null);

            return await getDispositivoAutorizado(identificador);

        } catch (error) {

            setError(error.message);
            throw error;

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        obtenerDispositivos();

    }, []);

    return {
        dispositivos,
        nombre,
        descripcion,
        setNombre,
        setDescripcion,
        loading,
        error,
        obtenerDispositivos,
        crearDispositivo,
        obtenerDispositivoAutorizado
    };
}

const formatearFecha = (fecha) => {

    if (!fecha) return "";

    return new Date(fecha).toLocaleString("es-CR", {
        dateStyle: "short",
        timeStyle: "short"
    });
};