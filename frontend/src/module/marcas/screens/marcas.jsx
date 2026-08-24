import Titulo from "../../../shared/components/Titulo";
import Texto from "../../../shared/components/Texto";
import Card from "../../../shared/components/Card";
import IconButton from "../../../shared/components/IconButton";
import Badge from "../../../shared/components/Badge";
import Select from "../../../shared/components/Select";
import Alert from "../../../shared/components/Alert";

import useMarcas from "../hooks/useMarcas";
import { formatForSelect } from "../../../shared/utils/formatters";

export default function Dispositivos({ }) {
    const {
        ultimaMarca,
        dispositivos,
        dispositivoSeleccionado,
        setDispositivoSeleccionado,
        loading,
        error,
        marcar
    } = useMarcas();

    const dispositivosOptions = formatForSelect(
        dispositivos,
        "id",
        "nombre"
    );

    return (
        <>
            <Titulo tipografia="h6" texto="REGISTRAR MARCAS" alineado="left" className="mt-3 ms-4 mb-2" color_text="black" />
            <Texto texto="El sistema detecta si es marca de entrada o salida de forma automatica" alineado="left" color_text="black" tamano_letra="6" className="ms-4 mt-0 mb-2" />

            <div className="px-4">
                <div className="row g-4">
                    <div className="col-12">
                        
                        {error && <Alert type="danger" message={error} className="mb-3" />}

                        <Card color_background="#ffff" color_texto="black" alineado_card="left" responsivo={true} texto_alineado="left">
                            <Select
                                id="dispositivo"
                                name="dispositivo"
                                label="Dispositivo"
                                options={dispositivosOptions}
                                value={dispositivoSeleccionado}
                                onChange={(e) => setDispositivoSeleccionado(e.target.value)}
                                disabled={loading}
                                required={true}
                            />

                            <div className="d-flex flex-column align-items-center">
                                <IconButton
                                    icon="huella"
                                    type="button"
                                    loading={loading}
                                    variant="success"
                                    onClick={marcar}
                                    className="rounded-circle d-flex flex-column align-items-center justify-content-center p-3"
                                    label="Marcar Ahora"
                                    iconStyle={{ fontSize: "60px" }}
                                    style={{ width: "200px", height: "200px" }}
                                />

                                {ultimaMarca && (
                                    <div className="text-center mt-3">
                                        <Badge
                                            label={ultimaMarca.tipo_marca}
                                            variant={ultimaMarca.tipo_marca === "ENTRADA" ? "success" : "danger"}
                                            pill={true}
                                        />
                                        <div className="mt-2">
                                            <Texto
                                                texto={`${new Date(ultimaMarca.fecha).toLocaleDateString("es-CR")} - ${ultimaMarca.hora}`}
                                                alineado="center" color_text="black" tamano_letra="6"
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