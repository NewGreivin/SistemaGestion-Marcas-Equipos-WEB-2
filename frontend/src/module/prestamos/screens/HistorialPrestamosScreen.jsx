/**
 * Autor: Marisol Alfaro
 * Descripción: Pantalla de consulta y filtrado del historial de préstamos.
 * Uso: Contiene únicamente las etiquetas y composición visual.
 */

import Alert from '../../../shared/components/Alert';
import Badge from '../../../shared/components/Badge';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';
import DateInput from '../../../shared/components/DateInput';
import DataTable from '../../../shared/components/DataTable';
import EmptyState from '../../../shared/components/EmptyState';
import Icon from '../../../shared/components/icon';
import Select from '../../../shared/components/Select';
import Texto from '../../../shared/components/Texto';
import Titulo from '../../../shared/components/Titulo';
import usePrestamos from '../hooks/usePrestamos';

const codigoPrestamo = (id) =>
  `PR-${String(id).padStart(4, '0')}`;

const varianteEstado = (estado) => {
  if (estado === 'FINALIZADO') {
    return 'secondary';
  }

  if (estado === 'DEVUELTO') {
    return 'success';
  }

  return 'warning';
};

export default function HistorialPrestamosScreen() {
  const {
    opciones,
    filtros,
    cambiarFiltro,
    historial,
    aplicarFiltros,
    cargando,
    alerta,
    limpiarAlerta,
  } = usePrestamos();

  const usuarios = opciones.usuarios.map((usuario) => ({
    value: usuario.id,
    label:
      usuario.nombre_completo ||
      usuario.username,
  }));

  const equipos = opciones.equipos.map((equipo) => ({
    value: equipo.id,
    label: `${equipo.codigo} — ${equipo.descripcion}`,
  }));

  const estados = [
    { value: 'PENDIENTE', label: 'Pendiente' },
    { value: 'DEVUELTO', label: 'Devuelto' },
    { value: 'FINALIZADO', label: 'Finalizado' },
  ];

  const columns = [
    { key: 'prestamo', label: 'N.º PRÉSTAMO' },
    { key: 'usuario', label: 'USUARIO' },
    { key: 'fecha', label: 'FECHA' },
    { key: 'estado', label: 'ESTADO' },
    { key: 'equipo', label: 'EQUIPO' },
    { key: 'descripcion', label: 'DESCRIPCIÓN' },
  ];

  const data = historial.map((item, index) => ({
    id: `${item.prestamo_id}-${item.equipo_id}-${index}`,
    prestamo: (
      <span className="fw-semibold">
        {codigoPrestamo(item.prestamo_id)}
      </span>
    ),
    usuario: item.usuario,
    fecha: String(item.fecha).slice(0, 10),
    estado: (
      <Badge
        label={item.estado}
        variant={varianteEstado(item.estado)}
      />
    ),
    equipo: item.equipo,
    descripcion: item.descripcion,
  }));

  return (
    <>
      <Titulo
        tipografia="h3"
        texto="Historial de préstamos"
        alineado="left"
        color_text="black"
        className="mt-3 mb-1"
      />

      <Texto
        texto="Consulta general de préstamos y devoluciones con filtros de búsqueda."
        alineado="left"
        color_text="secondary"
        tamano_letra="6"
        className="mb-4"
      />

      <Alert
        type={alerta.type || 'info'}
        message={alerta.message}
        onClose={limpiarAlerta}
        className="mb-4"
      />

      <Card
        header="Filtros de búsqueda"
        responsivo
        alineado_card="left"
        texto_alineado="left"
        className="mb-4"
      >
        <form onSubmit={aplicarFiltros}>
          <div className="row g-3">
            <div className="col-12 col-md-6 col-xl-3">
              <Select
                id="usuarioHistorial"
                name="usuarioHistorial"
                label="Usuario"
                options={usuarios}
                value={filtros.usuario}
                onChange={(event) =>
                  cambiarFiltro(
                    'usuario',
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <DateInput
                id="fechaHistorial"
                name="fechaHistorial"
                label="Fecha"
                value={filtros.fecha}
                onChange={(event) =>
                  cambiarFiltro(
                    'fecha',
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <Select
                id="estadoHistorial"
                name="estadoHistorial"
                label="Estado"
                options={estados}
                value={filtros.estado}
                onChange={(event) =>
                  cambiarFiltro(
                    'estado',
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <Select
                id="equipoHistorial"
                name="equipoHistorial"
                label="Equipo"
                options={equipos}
                value={filtros.equipo}
                onChange={(event) =>
                  cambiarFiltro(
                    'equipo',
                    event.target.value,
                  )
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-2">
            <Button
              type="submit"
              variant="primary"
              loading={cargando}
              className="px-4"
            >
              <Icon name="filtrar" />
              Filtrar
            </Button>
          </div>
        </form>
      </Card>

      {historial.length === 0 ? (
        <EmptyState
          title="No hay resultados"
          message="No se encontraron préstamos con los filtros seleccionados."
          icon="historialMarcas"
        />
      ) : (
        <Card
          header="Resultados"
          responsivo
          alineado_card="left"
          texto_alineado="left"
        >
          <DataTable
            columns={columns}
            data={data}
          />
        </Card>
      )}
    </>
  );
}
