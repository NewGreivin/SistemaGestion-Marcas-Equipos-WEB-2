/**
 * Autor: Brayan Azofeifa
 * Descripción: Pantalla para gestionar los departamentos (registro, modificación y eliminación).
 * Uso: Contiene únicamente las etiquetas y composición visual.
 */

import useDepartamentos from '../hooks/useDepartamentos';

import Titulo from '../../../shared/components/Titulo';
import Texto from '../../../shared/components/Texto';
import Button from '../../../shared/components/Button';
import Icon from '../../../shared/components/icon';
import EmptyState from '../../../shared/components/EmptyState';
import Table from '../../../shared/components/DataTable';
import Spinner from '../../../shared/components/Spinner';
import ConfirmModal from '../../../shared/components/ConfirmModal';
import FormModal from '../../../shared/components/FormModal';
import TextInput from '../../../shared/components/TextInput';
import TextArea from '../../../shared/components/TextArea';
import Card from '../../../shared/components/Card';

export default function GestionDepartamentosScreen() {
    
    // Extrayendo todo del Hook, incluyendo los errores (formErrors)
    const {
        departamentos,
        loading,
        error,
        columnasDepartamentos,
        accionesDepartamentos,
        mostrarModal,
        departamentoEditando,
        formData,
        formErrors, 
        cerrarModal,
        handleInputChange,
        alerta,
        cerrarAlerta,
        abrirModalRegistrar,
        guardarDepartamento
    } = useDepartamentos();

    return (
        <div className="container-fluid py-4">

            <ConfirmModal
                isOpen={alerta.isOpen}
                title={alerta.title}
                message={alerta.message}
                variant={alerta.variant}
                onConfirm={alerta.onConfirm}
                onClose={cerrarAlerta}
            />

            <FormModal
                isOpen={mostrarModal}
                onClose={cerrarModal}
                onSubmit={guardarDepartamento}
                title={departamentoEditando ? 'Modificar departamento' : 'Registrar departamento'}
                submitText={departamentoEditando ? 'Guardar cambios' : 'Guardar departamento'}
                size="md"
            >
                <TextInput
                    name="nombre"
                    label="Nombre"
                    placeholder="Ej: Ingeniería de Sistemas"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    error={formErrors.nombre} // Aquí está la magia roja
                />

                <TextArea
                    name="descripcion"
                    label="Descripción"
                    placeholder="Ej: Desarrollo de software y sistemas"
                    rows="3"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    error={formErrors.descripcion} // Aquí está la magia roja
                />

                <TextInput
                    name="encargado"
                    label="Encargado"
                    placeholder="Ej: Ing. Juan Pérez"
                    className="mb-4"
                    value={formData.encargado}
                    onChange={handleInputChange}
                    error={formErrors.encargado} // Aquí está la magia roja
                />
            </FormModal>

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <Texto
                        texto="ADMINISTRACIÓN"
                        className="text-success fw-bold mb-1"
                        tamano_letra="6"
                    />
                    <Titulo
                        tipografia="h2"
                        texto="Gestión de departamentos"
                        className="fw-bold mb-1"
                        color_text="black"
                    />
                    <Texto
                        texto="Consulta, registra, modifica y elimina departamentos o carreras."
                        color_text="gray"
                    />
                </div>
                
                <Button 
                    variant="primary" 
                    onClick={abrirModalRegistrar}
                >
                    <Icon 
                        name="agregar" 
                        className="me-2" 
                    />
                    Registrar
                </Button>
            </div>

            <Card 
                className="border-0 shadow-sm overflow-hidden" 
                card_width="100%"
            >
                {loading && (
                    <div className="p-5 text-center">
                        <Spinner color="primary" />
                        <Texto
                            texto="Cargando departamentos..."
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

                {!loading && !error && departamentos.length === 0 && (
                    <div className="p-5">
                        <EmptyState
                            title="Sin departamentos"
                            message="No hay departamentos registrados en el sistema."
                        />
                    </div>
                )}

                {!loading && !error && departamentos.length > 0 && (
                    <Table
                        columns={columnasDepartamentos}
                        data={departamentos}
                        actions={accionesDepartamentos}
                        className="mb-0"
                    />
                )}
            </Card>
            
        </div>
    );
}