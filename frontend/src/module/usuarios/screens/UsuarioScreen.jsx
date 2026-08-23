// Autor: Greivin Eliecer A.G

import { useUsuariosScreen } from '../hooks/useUsuariosScreen';

import Titulo from '../../../shared/components/Titulo';
import Texto from '../../../shared/components/Texto';
import Button from '../../../shared/components/Button';
import Badge from '../../../shared/components/Badge';
import Icon from '../../../shared/components/Icon';
import EmptyState from '../../../shared/components/EmptyState';
import Table from '../../../shared/components/DataTable';
import Spinner from '../../../shared/components/Spinner';
import ConfirmModal from '../../../shared/components/ConfirmModal';
import UsuarioModal from '../components/UsuarioModal';

export default function UsuariosScreen() {
    const {
        usuarios,
        loading,
        error,
        columnasUsuarios,
        accionesUsuarios,
        isFormOpen,
        usuarioEditar,
        cerrarForm,
        alerta,
        cerrarAlerta,
        handleRegistrar,
        handleGuardarFormulario,
    } = useUsuariosScreen();

    const datosTabla = usuarios.map((user) => {
        let fechaFormateada = '';
        if (user.fecha_nacimiento) {
            const fecha = new Date(user.fecha_nacimiento);
            const dia = String(fecha.getUTCDate()).padStart(2, '0');
            const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
            const anio = fecha.getUTCFullYear();
            fechaFormateada = `${dia}/${mes}/${anio}`;
        }
        return {
            ...user,
            fecha_nacimiento_formato: fechaFormateada,
            rol_badge: (
                <Badge
                    label={user.rol_id === 1 ? 'Administrador' : 'Usuario'}
                    variant={user.rol_id === 1 ? 'primary' : 'secondary'}
                    pill={true}
                />
            ),
        };
    });

    return (
        <div className="container-fluid py-4">
            <ConfirmModal {...alerta} onClose={cerrarAlerta} />
            <UsuarioModal
                isOpen={isFormOpen}
                onClose={cerrarForm}
                usuarioEditar={usuarioEditar}
                onGuardar={handleGuardarFormulario}
            />

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <Texto
                        texto="GESTIÓN DE USUARIOS"
                        className="text-success fw-bold mb-1"
                        tamano_letra="6"
                    />
                    <Titulo
                        tipografia="h2"
                        texto="Ver usuarios"
                        className="fw-bold mb-1"
                        color_text="black"
                    />
                    <Texto
                        texto="Consulta el registro y administra, edita o elimina usuarios del sistema."
                        color_text="gray"
                    />
                </div>
                <Button variant="primary" onClick={handleRegistrar}>
                    <Icon name="agregar" className="me-2" />
                    Registrar usuario
                </Button>
            </div>

            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="card-body p-0">
                    {loading && (
                        <div className="p-5 text-center">
                            <Spinner color="primary" />
                            <Texto
                                texto="Cargando usuarios..."
                                className="mt-3"
                                color_text="gray"
                            />
                        </div>
                    )}

                    {!loading && error && (
                        <div className="p-5">
                            <EmptyState
                                icon="error"
                                title="Ocurrió un error"
                                message={error}
                            />
                        </div>
                    )}

                    {!loading && !error && datosTabla.length === 0 && (
                        <div className="p-5">
                            <EmptyState
                                title="Sin usuarios"
                                message="No hay usuarios registrados en el sistema."
                            />
                        </div>
                    )}

                    {!loading && !error && datosTabla.length > 0 && (
                        <Table
                            columns={columnasUsuarios}
                            data={datosTabla}
                            actions={accionesUsuarios}
                            className="mb-0"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
