/**
 * Autor: Marisol Alfaro
 * Descripción: Pantalla para registrar un préstamo con uno o varios equipos.
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
import TextInput from '../../../shared/components/TextInput';
import Titulo from '../../../shared/components/Titulo';
import usePrestamos from '../hooks/usePrestamos';

const codigoPrestamo = (id) =>
  id
    ? `PR-${String(id).padStart(4, '0')}`
    : 'Automático';

export default function NuevoPrestamoScreen() {
  const {
    opciones,
    usuarioId,
    setUsuarioId,
    equipoSeleccionado,
    setEquipoSeleccionado,
    equiposPrestamo,
    prestamoCreado,
    fecha,
    encargado,
    cargando,
    alerta,
    limpiarAlerta,
    agregarEquipo,
    quitarEquipo,
    confirmarPrestamo,
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

  const columns = [
    { key: 'codigo', label: 'EQUIPO' },
    { key: 'descripcion', label: 'DESCRIPCIÓN' },
    { key: 'estado', label: 'ESTADO DE DEVOLUCIÓN' },
    { key: 'quitar', label: 'QUITAR' },
  ];

  const data = equiposPrestamo.map((equipo) => ({
    id: equipo.id,
    codigo: (
      <span className="fw-semibold">
        {equipo.codigo}
      </span>
    ),
    descripcion: equipo.descripcion,
    estado: (
      <Badge
        label="Pendiente"
        variant="warning"
      />
    ),
    quitar: (
      <Button
        type="button"
        variant="danger"
        className="btn-sm"
        onClick={() => quitarEquipo(equipo.id)}
        aria-label={`Quitar ${equipo.codigo}`}
      >
        <Icon name="eliminar" />
      </Button>
    ),
  }));

  return (
    <>
      <Titulo
        tipografia="h3"
        texto="Registrar préstamo"
        alineado="left"
        color_text="black"
        className="mt-3 mb-1"
      />

      <Texto
        texto="Completa el encabezado y agrega los equipos que se entregarán."
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
        header="Encabezado"
        responsivo
        alineado_card="left"
        texto_alineado="left"
        className="mb-4"
      >
        <div className="row g-3">
          <div className="col-12 col-md-6 col-xl-4">
            <TextInput
              id="numeroPrestamo"
              name="numeroPrestamo"
              label="N.º de préstamo"
              value={codigoPrestamo(
                prestamoCreado?.id,
              )}
              disabled
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <Select
              id="usuarioPrestamo"
              name="usuarioPrestamo"
              label="Usuario"
              options={usuarios}
              value={usuarioId}
              onChange={(event) =>
                setUsuarioId(event.target.value)
              }
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <DateInput
              id="fechaPrestamo"
              name="fechaPrestamo"
              label="Fecha"
              value={fecha}
              disabled
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <TextInput
              id="estadoPrestamo"
              name="estadoPrestamo"
              label="Estado"
              value="ACTIVO"
              disabled
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <TextInput
              id="encargadoPrestamo"
              name="encargadoPrestamo"
              label="Encargado"
              value={encargado}
              disabled
            />
          </div>
        </div>
      </Card>

      <Card
        header="Detalle de equipos"
        responsivo
        alineado_card="left"
        texto_alineado="left"
      >
        <div className="row g-3 align-items-end mb-4">
          <div className="col-12 col-lg-9">
            <Select
              id="equipoPrestamo"
              name="equipoPrestamo"
              label="Agregar equipo"
              options={equipos}
              value={equipoSeleccionado}
              onChange={(event) =>
                setEquipoSeleccionado(
                  event.target.value,
                )
              }
              className="mb-0"
            />
          </div>

          <div className="col-12 col-lg-3">
            <Button
              type="button"
              variant="success"
              className="w-100"
              onClick={agregarEquipo}
            >
              <Icon name="agregar" />
              Agregar al préstamo
            </Button>
          </div>
        </div>

        {equiposPrestamo.length === 0 ? (
          <EmptyState
            title="Sin equipos agregados"
            message="Seleccione un equipo disponible para incluirlo en el préstamo."
            icon="equipo"
          />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={data}
            />

            <div className="d-flex justify-content-end mt-3">
              <Button
                type="button"
                variant="primary"
                loading={cargando}
                onClick={confirmarPrestamo}
              >
                <Icon name="correcto" />
                Confirmar préstamo
              </Button>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
