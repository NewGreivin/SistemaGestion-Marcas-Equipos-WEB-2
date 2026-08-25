import React from 'react';
import { useEquiposScreen } from '../hooks/useEquiposScreen';

import Titulo from '../../../shared/components/Titulo';
import Texto from '../../../shared/components/Texto';
import Button from '../../../shared/components/Button';
import Badge from '../../../shared/components/Badge';
import Icon from '../../../shared/components/icon';
import EmptyState from '../../../shared/components/EmptyState';
import Table from '../../../shared/components/DataTable';
import Spinner from '../../../shared/components/Spinner';
import ConfirmModal from '../../../shared/components/ConfirmModal';
import SearchInput from '../../../shared/components/SearchInput';
import EquipoModal from '../components/EquipoModal';

export default function EquiposScreen() {
    const {
        equipos,
        loading,
        error,
        searchTerm,
        handleSearchChange,
        columnasEquipos,
        accionesEquipos,
        isFormOpen,
        equipoEditar,
        cerrarForm,
        alerta,
        cerrarAlerta,
        handleRegistrar,
        handleGuardarFormulario,
    } = useEquiposScreen();

    const getEstadoBadgeVariant = (estado) => {
        switch (estado) {
            case 'DISPONIBLE': return 'success';
            case 'PRESTADO': return 'warning';
            case 'MANTENIMIENTO': return 'danger';
            case 'INACTIVO': return 'secondary';
            default: return 'primary';
        }
    };

    const datosTabla = equipos.map((equipo) => {
        return {
            ...equipo,
            codigo_ui: <span className="fw-bold">{equipo.codigo}</span>,
            estado_badge: (
                <Badge
                    label={equipo.estado}
                    variant={getEstadoBadgeVariant(equipo.estado)}
                    pill={true}
                />
            ),
        };
    });

    return (
        <div className="container-fluid py-4">
            <ConfirmModal {...alerta} onClose={cerrarAlerta} />
            
            <EquipoModal
                isOpen={isFormOpen}
                onClose={cerrarForm}
                equipoEditar={equipoEditar}
                onGuardar={handleGuardarFormulario}
            />

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <Texto
                        texto="PRÉSTAMO DE EQUIPOS"
                        color_text="grey"
                        className="fw-bold mb-1 text-uppercase"
                        tamano_letra="6"
                    />
                    <Titulo
                        tipografia="h2"
                        texto="Ver equipos"
                        className="fw-bold mb-1"
                        color_text="black"
                    />
                    <Texto
                        texto="Consulta el inventario y registra, edita o elimina equipos."
                        color_text="gray"
                    />
                </div>
                <Button variant="primary" onClick={handleRegistrar}>
                    <Icon name="agregar" className="me-2" />
                    Registrar equipo
                </Button>
            </div>

            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="card-body p-0">
                    <div className="p-3 border-bottom bg-light">
                        <div className="row">
                            <div className="col-md-4">
                                <SearchInput 
                                    value={searchTerm} 
                                    onChange={handleSearchChange} 
                                    placeholder="Buscar por código o descripción..."
                                    className="mb-0"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="p-5 text-center">
                            <Spinner color="primary" />
                            <Texto
                                texto="Cargando inventario de equipos..."
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
                                title="Sin resultados"
                                message={searchTerm ? "No se encontraron equipos que coincidan con tu búsqueda." : "No hay equipos registrados en el inventario."}
                            />
                        </div>
                    )}

                    {!loading && !error && datosTabla.length > 0 && (
                        <Table
                            columns={columnasEquipos}
                            data={datosTabla}
                            actions={accionesEquipos}
                            className="mb-0"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
