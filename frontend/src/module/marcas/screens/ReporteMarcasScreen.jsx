/**
 * Autor: Brayan Azofeifa
 * Descripción: Pantalla para visualizar, filtrar y exportar los reportes de marcas.
 * Uso: Contiene únicamente las etiquetas y composición visual.
 */

import useReporteMarcas from '../hooks/useReporteMarcas';

import Titulo from '../../../shared/components/Titulo';
import Texto from '../../../shared/components/Texto';
import Button from '../../../shared/components/Button';
import Icon from '../../../shared/components/icon';
import EmptyState from '../../../shared/components/EmptyState';
import Table from '../../../shared/components/DataTable';
import Spinner from '../../../shared/components/Spinner';
import DateInput from '../../../shared/components/DateInput';
import Select from '../../../shared/components/Select';
import Card from '../../../shared/components/Card';

export default function ReporteMarcasScreen() {

    const {
        reportes,
        loading,
        error,
        columnasReporte,
        filtros,
        handleFiltroChange,
        aplicarFiltros,
        exportarJSON,
        exportarPDF,
        opcionesUsuarios,
        opcionesDepartamentos
    } = useReporteMarcas();

    return (
        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <Texto
                        texto="MARCAS Y DISPOSITIVOS"
                        className="text-success fw-bold mb-1"
                        tamano_letra="6"
                    />

                    <Titulo
                        tipografia="h2"
                        texto="Reporte de marcas"
                        className="fw-bold mb-1"
                        color_text="black"
                    />

                    <Texto
                        texto="Consulta general de entradas y salidas registradas en el sistema."
                        color_text="gray"
                    />
                </div>

                <div className="d-flex gap-2">
                    <Button
                        variant="outline-secondary"
                        onClick={exportarJSON}
                    >
                        <Icon
                            name="filetype-json"
                            className="me-2"
                        />
                        JSON
                    </Button>

                    <Button
                        variant="danger"
                        onClick={exportarPDF}
                    >
                        <Icon
                            name="file-pdf"
                            className="me-2"
                        />
                        PDF
                    </Button>
                </div>
            </div>

            <Card
                className="mb-4 border-0 shadow-sm"
                card_width="100%"
            >
                <div className="row g-3 align-items-end p-2">

                    <div className="col-md-3">
                        <Select
                            id="usuario"
                            name="usuario"
                            label="Usuario"
                            value={filtros.usuario}
                            onChange={handleFiltroChange}
                            options={opcionesUsuarios}
                        />
                    </div>

                    <div className="col-md-3">
                        <DateInput
                            id="fecha"
                            name="fecha"
                            label="Fecha"
                            value={filtros.fecha}
                            onChange={handleFiltroChange}
                        />
                    </div>

                    <div className="col-md-5">
                        <Select
                            id="departamento"
                            name="departamento"
                            label="Departamento"
                            value={filtros.departamento}
                            onChange={handleFiltroChange}
                            options={opcionesDepartamentos}
                        />
                    </div>

                    <div className="col-md-1 d-flex justify-content-end">
                        <div className="mb-3 w-100">
                            <Button
                                variant="success"
                                className="w-100"
                                onClick={aplicarFiltros}
                            >
                                <i className="bi bi-funnel"></i>
                            </Button>
                        </div>
                    </div>

                </div>
            </Card>

            <Card
                className="border-0 shadow-sm overflow-hidden"
                card_width="100%"
            >
                {loading && (
                    <div className="p-5 text-center">
                        
                        <Spinner
                            color="primary"
                        />

                        <Texto
                            texto="Cargando reportes..."
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

                {!loading && !error && reportes.length === 0 && (
                    <div className="p-5">
                        <EmptyState
                            title="Sin resultados"
                            message="No se encontraron marcas registradas con estos filtros."
                        />
                    </div>
                )}

                {!loading && !error && reportes.length > 0 && (
                    <Table
                        columns={columnasReporte}
                        data={reportes}
                        className="mb-0"
                    />
                )}
            </Card>

        </div>
    );
}