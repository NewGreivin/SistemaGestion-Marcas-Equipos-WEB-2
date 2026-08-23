/**
 * Autor: Marisol Alfaro
 * Descripción: Pantalla para procesar devoluciones individuales o completas.
 * Uso: Contiene únicamente las etiquetas y composición visual.
 */

import Alert from '../../../shared/components/Alert';
import Badge from '../../../shared/components/Badge';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';
import DataTable from '../../../shared/components/DataTable';
import EmptyState from '../../../shared/components/EmptyState';
import Icon from '../../../shared/components/icon';
import Texto from '../../../shared/components/Texto';
import TextInput from '../../../shared/components/TextInput';
import Titulo from '../../../shared/components/Titulo';
import usePrestamos from '../hooks/usePrestamos';

const codigoPrestamo = (id) =>
  `PR-${String(id).padStart(4, '0')}`;

export default function DevolucionScreen() {
  const {
    numeroBusqueda,
    cambiarNumeroBusqueda,
    devolucion,
    buscarDevolucion,
    devolverIndividual,
    devolverCompleta,
    cargando,
    alerta,
    limpiarAlerta,
  } = usePrestamos();

  const columns = [
    {
      key: 'codigo',
      label: 'EQUIPO',
    },
    {
      key: 'descripcion',
      label: 'DESCRIPCIÓN',
    },
    {
      key: 'estado',
      label: 'ESTADO',
    },
    {
      key: 'accion',
      label: 'ACCIÓN',
    },
  ];

  const data =
    devolucion?.equipos?.map((equipo) => {
      const devuelto =
        equipo.estado === 'DEVUELTO';

      return {
        id: equipo.equipo_id,

        codigo: (
          <span className="fw-semibold">
            {equipo.codigo}
          </span>
        ),

        descripcion: equipo.descripcion,

        estado: (
          <Badge
            label={equipo.estado}
            variant={
              devuelto
                ? 'success'
                : 'warning'
            }
          />
        ),

        accion: (
          <Button
            type="button"
            variant="secondary"
            className="btn-sm"
            onClick={() =>
              devolverIndividual(
                equipo.equipo_id
              )
            }
            disabled={
              cargando || devuelto
            }
          >
            <Icon name="devolucion" />
            Devolución individual
          </Button>
        ),
      };
    }) ?? [];

  return (
    <>
      {/* Título */}
      <Titulo
        tipografia="h3"
        texto="Devolución de equipos"
        alineado="left"
        color_text="black"
        className="mt-3 mb-1"
      />

      {/* Descripción */}
      <Texto
        texto="Busca un préstamo activo para procesar una devolución individual o completa."
        alineado="left"
        color_text="secondary"
        tamano_letra="6"
        className="mb-4"
      />

      {/* Alertas */}
      <Alert
        type={alerta.type || 'info'}
        message={alerta.message}
        onClose={limpiarAlerta}
        className="mb-4"
      />

      {/* Buscar préstamo */}
      <Card
        header="Buscar préstamo"
        responsivo
        alineado_card="left"
        texto_alineado="left"
        className="mb-4"
      >
        <div className="row g-3">

          {/* Número de préstamo */}
          <div className="col-12 col-lg-9">
            <TextInput
              id="numeroPrestamoDevolucion"
              name="numeroPrestamoDevolucion"
              label="Número de préstamo"
              placeholder="Ej: 1 o PR-0001"
              value={numeroBusqueda}
              onChange={(event) =>
                cambiarNumeroBusqueda(
                  event.target.value
                )
              }
              className="mb-0"
            />
          </div>

          {/* Botón buscar */}
          <div className="col-12 col-lg-3">

            {/* Mantiene el botón alineado con el input */}
            <label
              className="form-label invisible"
              aria-hidden="true"
            >
              Acción
            </label>

            <Button
              type="button"
              variant="success"
              className="w-100"
              loading={cargando}
              onClick={buscarDevolucion}
            >
              <Icon name="buscar" />
              Buscar préstamo
            </Button>
          </div>

        </div>
      </Card>

      {/* Estado inicial */}
      {!devolucion ? (
        <EmptyState
          title="Busca un préstamo"
          message="El detalle del préstamo aparecerá aquí para realizar la devolución."
          icon="buscar"
        />
      ) : (

        /* Información del préstamo */
        <Card
          header={`Préstamo ${codigoPrestamo(
            devolucion.id
          )} — ${devolucion.usuario}`}
          responsivo
          alineado_card="left"
          texto_alineado="left"
          footer={
            <div className="d-flex justify-content-end">

              {/* Devolución completa */}
              <Button
                type="button"
                variant="primary"
                loading={cargando}
                disabled={
                  devolucion.estado ===
                  'FINALIZADO'
                }
                onClick={devolverCompleta}
              >
                <Icon name="correcto" />
                Devolución completa
              </Button>

            </div>
          }
        >
          {/* Tabla de equipos */}
          <DataTable
            columns={columns}
            data={data}
          />
        </Card>
      )}
    </>
  );
}