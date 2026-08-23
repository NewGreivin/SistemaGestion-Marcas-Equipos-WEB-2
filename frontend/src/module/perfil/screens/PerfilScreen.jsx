//Autor: Greivin Eliecer A.G

import { usePerfil } from '../hooks/usePerfil';

import TextInput from '../../../shared/components/TextInput';
import DateInput from '../../../shared/components/DateInput';
import Select from '../../../shared/components/Select';
import Button from '../../../shared/components/Button';
import Alert from '../../../shared/components/Alert';
import Texto from '../../../shared/components/Texto';
import Titulo from '../../../shared/components/Titulo';
import Card from '../../../shared/components/Card';
import Avatar from '../../../shared/components/Avatar';
import Badge from '../../../shared/components/Badge';

export default function PerfilScreen() {
    const {
        formData,
        errores,
        cargando,
        guardando,
        departamentos,
        alerta,
        handleChange,
        handleGuardar,
    } = usePerfil();

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Texto
                    texto="Cargando tu información..."
                    tamano_letra="5"
                    color_text="grey"
                />
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-4">
            <div className="mb-4">
                <Texto
                    texto="MI CUENTA"
                    tamano_letra="6"
                    color_text="grey"
                    className="fw-bold mb-1 text-uppercase"
                />
                <Titulo
                    tipografia="h2"
                    texto="Mi perfil"
                    color_text="black"
                    className="fw-bold mb-1"
                />
                <Texto
                    texto="Consulta y actualiza tu información personal."
                    color_text="grey"
                />
            </div>

            {alerta.visible && (
                <Alert
                    type={alerta.tipo}
                    message={alerta.mensaje}
                    className="mb-4 shadow-sm"
                />
            )}

            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <Card
                        responsivo={true}
                        alineado_card="left"
                        className="border-0 shadow-sm"
                        header={
                            <Titulo
                                tipografia="h5"
                                texto="Información personal"
                                className="mb-0 pt-2 pb-2 fw-bold"
                                color_text="black"
                            />
                        }
                    >
                        <form onSubmit={handleGuardar} noValidate>
                            <div className="mb-4 mt-2">
                                <TextInput
                                    id="nombre_completo"
                                    name="nombre_completo"
                                    label="Nombre completo"
                                    value={formData.nombre_completo}
                                    onChange={handleChange}
                                    error={errores.nombre_completo}
                                    required
                                />
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <DateInput
                                        id="fecha_nacimiento"
                                        name="fecha_nacimiento"
                                        label="Fecha de nacimiento"
                                        value={formData.fecha_nacimiento}
                                        onChange={handleChange}
                                        error={errores.fecha_nacimiento}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Select
                                        id="departamento_id"
                                        name="departamento_id"
                                        label="Departamento o carrera"
                                        options={departamentos}
                                        value={formData.departamento_id}
                                        onChange={handleChange}
                                        error={errores.departamento_id}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <TextInput
                                        id="correo"
                                        name="correo"
                                        label="Correo electrónico"
                                        value={formData.correo}
                                        disabled
                                        className="mb-1"
                                    />
                                    <Texto
                                        texto="No editable. Contacta al administrador para cambiarlo."
                                        tamano_letra="6"
                                        color_text="grey"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextInput
                                        id="username"
                                        name="username"
                                        label="Nombre de usuario"
                                        value={formData.username}
                                        disabled
                                        className="mb-1"
                                    />
                                    <Texto
                                        texto="No editable."
                                        tamano_letra="6"
                                        color_text="grey"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={guardando}
                                    className="px-4 py-2"
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                <div className="col-12 col-lg-4">
                    <Card
                        responsivo={true}
                        alineado_card="center"
                        texto_alineado="center"
                        className="border-0 shadow-sm py-4"
                    >
                        <div className="d-flex justify-content-center mb-3 mt-3">
                            <Avatar
                                nombre={formData.nombre_completo}
                                size="lg"
                                variant="dark"
                            />
                        </div>

                        <Titulo
                            tipografia="h5"
                            texto={formData.nombre_completo}
                            className="fw-bold mb-1"
                            color_text="black"
                            alineado = "center"
                        />

                        <Texto
                            texto={`@${formData.username}`}
                            color_text="grey"
                            className="mb-3"
                            alineado = "center"
                        />

                        <Badge
                            label={formData.rol_nombre || 'Usuario'}
                            variant="success"
                            pill={true}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}
