import { useState } from "react";

import Titulo from "../../../shared/components/Titulo";
import Texto from "../../../shared/components/Texto";
import Card from "../../../shared/components/Card";
import IconButton from "../../../shared/components/IconButton";
import Badge from "../../../shared/components/Badge";

export default function Dispositivos({ }) {

    //Remover al utilizar API

    const [loading, setLoading] = useState(false);
    const [ultimaMarca, setUltimaMarca] = useState(null);

    const registrarMarca = () => {

        setLoading(true);

        const tipo = ultimaMarca?.tipo === "ENTRADA"
            ? "SALIDA"
            : "ENTRADA";

        const fecha = new Date();

        setUltimaMarca({
            tipo,
            fecha
        });

        setLoading(false);
    };

    return (
        <>
            <Titulo
                tipografia="h6"
                texto="REGISTRAR MARCAS"
                alineado="left"
                className="mt-3 ms-4 mb-2"
                color_text="black"
            />

            <Texto
                texto="El sistema detecta si es marca de entrada o salida de forma automatica"
                alineado="left"
                color_text="black"
                tamano_letra="6"
                className="ms-4 mt-0 mb-2"
            />

            <div className="px-4">
                <div className="row g-4">
                    <div className="col-12">

                        <Card
                            color_background="#ffff"
                            color_texto="black"
                            alineado_card="left"
                            responsivo={true}
                            texto_alineado="left"
                        >

                            <div className="d-flex flex-column align-items-center">

                                <IconButton
                                    icon="huella"
                                    type="button"
                                    loading={loading}
                                    variant="success"
                                    onClick={registrarMarca}
                                    className="rounded-circle d-flex flex-column align-items-center justify-content-center p-3"
                                    label="Marcar Ahora"
                                    iconStyle={{ fontSize: "60px" }}
                                    style={{
                                        width: "200px",
                                        height: "200px"
                                    }}
                                />

                                {ultimaMarca && (
                                    <div className="text-center mt-3">

                                        <Badge
                                            label={ultimaMarca.tipo}
                                            variant={
                                                ultimaMarca.tipo === "ENTRADA"
                                                    ? "success"
                                                    : "danger"
                                            }
                                            pill={true}
                                        />

                                        <div className="mt-2">
                                            <Texto
                                                texto={ultimaMarca.fecha.toLocaleString("es-CR")}
                                                alineado="center"
                                                color_text="black"
                                                tamano_letra="6"
                                            />
                                        </div>

                                    </div>
                                )}

                            </div>

                        </Card>

                    </div>
                </div>
            </div>
        </>
    );
}