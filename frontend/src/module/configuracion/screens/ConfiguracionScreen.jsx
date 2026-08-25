// Autor: Greivin Eliecer A.G

import { useConfiguracion } from '../hooks/useConfiguracion';

import TextInput from '../../../shared/components/TextInput';
import NumberInput from '../../../shared/components/NumberInput';
import Button from '../../../shared/components/Button';
import Alert from '../../../shared/components/Alert';
import Texto from '../../../shared/components/Texto';
import Titulo from '../../../shared/components/Titulo';
import Card from '../../../shared/components/Card';
import Spinner from '../../../shared/components/Spinner';

export default function ConfiguracionScreen() {
    const { formData, errores, cargando, guardando, alerta, handleChange, handleGuardar } = useConfiguracion();

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-4">

            {/* ENCABEZADO */}
            <div className="mb-4">
                <Texto
                    texto="CONFIGURACIÓN"
                    tamano_letra="6"
                    color_text="grey"
                    className="fw-bold mb-1 text-uppercase"
                />
                <Titulo
                    tipografia="h2"
                    texto="Ajustes del sistema"
                    color_text="black"
                    className="fw-bold mb-1"
                />
                <Texto
                    texto="Parámetros generales de funcionamiento de la plataforma."
                    color_text="grey"
                />
            </div>

            {alerta.visible && (
                <Alert type={alerta.tipo} message={alerta.mensaje} className="mb-4 shadow-sm" />
            )}

            <Card
                responsivo={true}
                alineado_card="left"
                className="border-0 shadow-sm"
                header={
                    <Titulo
                        tipografia="h5"
                        texto="Panel de control"
                        className="mb-0 pt-2 pb-2 fw-bold"
                        color_text="black"
                    />
                }
            >
                <form onSubmit={handleGuardar} noValidate>

                    <div className="mb-4 mt-2">
                        <TextInput
                            id="nombre_institucion"
                            name="nombre_institucion"
                            label="Nombre de la institución"
                            value={formData.nombre_institucion}
                            onChange={handleChange}
                            error={errores.nombre_institucion}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <TextInput
                            id="rango_ip_permitido"
                            name="rango_ip_permitido"
                            label="Rango de IP permitido para marcas"
                            value={formData.rango_ip_permitido}
                            onChange={handleChange}
                            error={errores.rango_ip_permitido}
                            placeholder="Ej: 192.168.1.0/24"
                        />
                        <Texto
                            texto="Define el rango de red desde el cual se aceptan marcas de entrada/salida."
                            tamano_letra="6"
                            color_text="grey"
                        />
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <NumberInput
                                id="tiempo_maximo_sesion"
                                name="tiempo_maximo_sesion"
                                label="Tiempo máximo de sesión (minutos)"
                                value={formData.tiempo_maximo_sesion}
                                onChange={handleChange}
                                error={errores.tiempo_maximo_sesion}
                                min={1}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <NumberInput
                                id="tamano_maximo_archivos"
                                name="tamano_maximo_archivos"
                                label="Tamaño máximo de archivos (MB)"
                                value={formData.tamano_maximo_archivos}
                                onChange={handleChange}
                                error={errores.tamano_maximo_archivos}
                                min={1}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button type="submit" variant="primary" loading={guardando} className="px-4 py-2">
                            Guardar configuración
                        </Button>
                    </div>

                </form>
            </Card>

        </div>
    );
}