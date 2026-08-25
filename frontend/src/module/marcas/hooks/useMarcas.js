// Autor: Ricardo Chaves Campos

import { useEffect, useState } from "react";
import { getUltimaMarca, createMarca } from "../services/marcas.service";
import { getDispositivosUsuario } from "../../dispositivos/services/dispositivos.service";


export default function useMarcas() {

    const [ultimaMarca, setUltimaMarca] = useState(null);

    const [dispositivos, setDispositivos] = useState([]);

    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    const obtenerUltimaMarca = async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await getUltimaMarca();

            if (data && data.fecha && data.hora && data.tipo_marca) {
                setUltimaMarca(data);
            } else {
                setUltimaMarca(null);
            }

            return data;

        } catch (error) {

            setError(error.message);

            throw error;

        } finally {

            setLoading(false);
        }
    };

    const obtenerDispositivos = async () => {

        try {

            setError(null);

            const data = await getDispositivosUsuario();

            setDispositivos(data);

            return data;

        } catch (error) {

            setError(error.message);

            throw error;
        }
    };

    const marcar = async () => {

        try {

            if (!dispositivoSeleccionado) {
                throw new Error("Debe seleccionar un dispositivo");
            }

            setLoading(true);
            setError(null);

            const data = await createMarca(dispositivoSeleccionado);

            setUltimaMarca(data);

            return data;

        } catch (error) {

            setError(error.message);

            throw error;

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        obtenerUltimaMarca();
        obtenerDispositivos();

    }, []);

    return {
        ultimaMarca,
        dispositivos,
        dispositivoSeleccionado,
        setDispositivoSeleccionado,
        loading,
        error,
        obtenerUltimaMarca,
        marcar
    };
}