import Titulo from "../../../shared/components/Titulo";
import Texto from "../../../shared/components/Texto";
import Card from "../../../shared/components/Card";
import TextInput from "../../../shared/components/TextInput";
import TextArea from "../../../shared/components/TextArea";
import Button from "../../../shared/components/Button";
import Icon from "../../../shared/components/Icon";
import DataTable from "../../../shared/components/DataTable";

import useDispositivos from "../hooks/useDispositivos";

export default function Dispositivos({ }) {

    const {
        dispositivos,
        nombre,
        descripcion,
        setNombre,
        setDescripcion,
        loading,
        error,
        crearDispositivo
    } = useDispositivos();

    const columns = [
        {
            key: "estado",
            label: "Estado"
        },
        {
            key: "nombre",
            label: "Nombre"
        },
        {
            key: "fecha_registro",
            label: "Fecha Registro"
        },
        {
            key: "identificador",
            label: "Identificador"
        },
        {
            key: "descripcion",
            label: "Descripcion"
        }
    ];


    return (
        <>
            <Titulo
                tipografia="h6"
                texto="MIS DISPOSITIVOS"
                alineado="left"
                className="mt-3 ms-4 mb-2"
                color_text="black"
            />

            <Texto
                texto="Registra y administra tus dispositivos"
                alineado="left"
                color_text="black"
                tamano_letra="6"
                className="ms-4 mt-0 mb-2"
            />

            <div className="px-4">
                <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-4">

                        <Card
                            color_background="#ffff"
                            color_texto="black"
                            alineado_card="left"
                            header="Registrar Dispositivo"
                            responsivo={true}
                            texto_alineado="left"
                        >

                            <TextInput
                                id="nombre"
                                label="Nombre"
                                placeholder="Eje: Laptop Acer"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />

                            <TextArea
                                id="descripcion"
                                label="Descripcion"
                                placeholder="Marca, modelo u otra referencia"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                rows={3}
                                required
                            />

                            <div className="d-flex justify-content-center mt-2">

                                <Button
                                    type="submit"
                                    onClick={crearDispositivo}
                                    disabled={loading}
                                    variant="primary"
                                    loading={loading}
                                    className="w-100"
                                >
                                    <Icon name="agregar" />

                                    {loading
                                        ? "Guardar..."
                                        : "Registrar Dispositivo"
                                    }

                                </Button>

                            </div>

                        </Card>

                        {error && (
                            <Texto
                                texto={error}
                                color_text="danger"
                            />
                        )}

                    </div>


                    <div className="col-12 col-lg-8">
                        <DataTable
                            columns={columns}
                            data={dispositivos}
                        >
                        </DataTable>
                    </div>

                </div>
            </div>
        </>
    )
}