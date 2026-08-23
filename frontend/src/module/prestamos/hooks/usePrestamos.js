/**
 * Autor: Marisol Alfaro
 * Descripción: Contiene la lógica de préstamos, devoluciones e historial.
 * Uso: Separa estados, validaciones y solicitudes de las pantallas.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import * as prestamoService from '../services/prestamo.service';

// ============================================================
// Fecha actual
// ============================================================
const obtenerFechaActual = () =>
  new Date().toISOString().slice(0, 10);

// ============================================================
// Encargado de sesión
// ============================================================
const obtenerEncargado = () => {
  try {
    const usuario = JSON.parse(
      localStorage.getItem('gestion_usuario') || '{}',
    );

    return (
      usuario.nombre_completo ||
      usuario.nombre ||
      usuario.username ||
      'Encargado de sesión'
    );
  } catch {
    return 'Encargado de sesión';
  }
};

export default function usePrestamos() {
  // ============================================================
  // Estados generales
  // ============================================================
  const [opciones, setOpciones] = useState({
    usuarios: [],
    equipos: [],
  });

  const [cargando, setCargando] = useState(false);

  const [alerta, setAlerta] = useState({
    type: '',
    message: '',
  });

  // ============================================================
  // Registro de préstamo
  // ============================================================
  const [usuarioId, setUsuarioId] = useState('');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('');
  const [equiposPrestamo, setEquiposPrestamo] = useState([]);
  const [prestamoCreado, setPrestamoCreado] = useState(null);

  // ============================================================
  // Devoluciones
  // ============================================================
  const [numeroBusqueda, setNumeroBusqueda] = useState('');
  const [devolucion, setDevolucion] = useState(null);

  // ============================================================
  // Historial
  // ============================================================
  const [filtros, setFiltros] = useState({
    usuario: '',
    fecha: '',
    estado: '',
    equipo: '',
  });

  const [historial, setHistorial] = useState([]);

  // ============================================================
  // Datos derivados
  // ============================================================
  const fecha = useMemo(() => obtenerFechaActual(), []);
  const encargado = useMemo(() => obtenerEncargado(), []);

  // ============================================================
  // Alertas
  // ============================================================
  const limpiarAlerta = useCallback(() => {
    setAlerta({
      type: '',
      message: '',
    });
  }, []);

  const mostrarError = useCallback((error, fallback) => {
    setAlerta({
      type: 'danger',
      message:
        error?.data?.message ||
        error?.message ||
        fallback,
    });
  }, []);

  // ============================================================
  // Cargar usuarios y equipos
  // ============================================================
  const cargarOpciones = useCallback(async () => {
    setCargando(true);

    try {
      const data = await prestamoService.obtenerOpcionesPrestamo();

      setOpciones({
        usuarios: data?.usuarios ?? [],
        equipos: data?.equipos ?? [],
      });
    } catch (error) {
      mostrarError(
        error,
        'No fue posible cargar usuarios y equipos.',
      );
    } finally {
      setCargando(false);
    }
  }, [mostrarError]);

  // ============================================================
  // Agregar equipo al préstamo
  // ============================================================
  const agregarEquipo = () => {
    limpiarAlerta();

    if (!equipoSeleccionado) {
      setAlerta({
        type: 'warning',
        message: 'Seleccione un equipo.',
      });
      return;
    }

    const equipo = opciones.equipos.find(
      (item) =>
        String(item.id) === String(equipoSeleccionado),
    );

    if (!equipo) return;

    const repetido = equiposPrestamo.some(
      (item) => item.id === equipo.id,
    );

    if (repetido) {
      setAlerta({
        type: 'warning',
        message: 'El equipo ya fue agregado.',
      });
      return;
    }

    setEquiposPrestamo((actuales) => [
      ...actuales,
      equipo,
    ]);

    setEquipoSeleccionado('');
  };

  // ============================================================
  // Quitar equipo
  // ============================================================
  const quitarEquipo = (equipoId) => {
    setEquiposPrestamo((actuales) =>
      actuales.filter(
        (equipo) => equipo.id !== equipoId,
      ),
    );
  };

  // ============================================================
  // Confirmar préstamo
  // ============================================================
  const confirmarPrestamo = async () => {
    limpiarAlerta();

    if (!usuarioId) {
      setAlerta({
        type: 'warning',
        message: 'Seleccione un usuario.',
      });
      return;
    }

    if (equiposPrestamo.length === 0) {
      setAlerta({
        type: 'warning',
        message: 'Agregue al menos un equipo.',
      });
      return;
    }

    setCargando(true);

    try {
      const data = await prestamoService.crearPrestamo(
        usuarioId,
        equiposPrestamo.map((equipo) => equipo.id),
      );

      setPrestamoCreado(data);

      setAlerta({
        type: 'success',
        message: 'Préstamo creado correctamente.',
      });

      setUsuarioId('');
      setEquipoSeleccionado('');
      setEquiposPrestamo([]);

      await cargarOpciones();
    } catch (error) {
      mostrarError(
        error,
        'No fue posible crear el préstamo.',
      );
    } finally {
      setCargando(false);
    }
  };

  // ============================================================
  // Número de préstamo para devolución
  // ============================================================
  const cambiarNumeroBusqueda = (valor) => {
    const limpio = valor
      .replace(/^PR-/i, '')
      .replace(/^0+/, '');

    setNumeroBusqueda(limpio);
  };

  // ============================================================
  // Buscar préstamo para devolución
  // ============================================================
  const buscarDevolucion = async () => {
    limpiarAlerta();

    if (!numeroBusqueda.trim()) {
      setAlerta({
        type: 'warning',
        message: 'Digite el número de préstamo.',
      });
      return;
    }

    setCargando(true);

    try {
      const data =
        await prestamoService.obtenerEstadoDevolucion(
          numeroBusqueda.trim(),
        );

      setDevolucion(data);
    } catch (error) {
      setDevolucion(null);

      mostrarError(
        error,
        'No fue posible encontrar el préstamo.',
      );
    } finally {
      setCargando(false);
    }
  };

  // ============================================================
  // Devolución individual
  // ============================================================
  const devolverIndividual = async (equipoId) => {
    if (!devolucion?.id) return;

    setCargando(true);
    limpiarAlerta();

    try {
      const data = await prestamoService.devolverEquipo(
        devolucion.id,
        equipoId,
      );

      setDevolucion(data);

      setAlerta({
        type: 'success',
        message: 'Equipo devuelto correctamente.',
      });
    } catch (error) {
      mostrarError(
        error,
        'No fue posible devolver el equipo.',
      );
    } finally {
      setCargando(false);
    }
  };

  // ============================================================
  // Devolución completa
  // ============================================================
  const devolverCompleta = async () => {
    if (!devolucion?.id) return;

    setCargando(true);
    limpiarAlerta();

    try {
      const data =
        await prestamoService.devolverPrestamoCompleto(
          devolucion.id,
        );

      setDevolucion(data);

      setAlerta({
        type: 'success',
        message:
          'Devolución completa realizada correctamente.',
      });
    } catch (error) {
      mostrarError(
        error,
        'No fue posible realizar la devolución completa.',
      );
    } finally {
      setCargando(false);
    }
  };

  // ============================================================
  // Cambiar filtros
  // ============================================================
  const cambiarFiltro = (campo, valor) => {
    setFiltros((actuales) => ({
      ...actuales,
      [campo]: valor,
    }));
  };

  // ============================================================
  // Cargar historial
  // ============================================================
  const cargarHistorial = useCallback(
    async (filtrosActuales = filtros) => {
      setCargando(true);

      try {
        const data =
          await prestamoService.obtenerHistorial(
            filtrosActuales,
          );

        setHistorial(data);
      } catch (error) {
        mostrarError(
          error,
          'No fue posible cargar el historial.',
        );
      } finally {
        setCargando(false);
      }
    },
    [filtros, mostrarError],
  );

  // ============================================================
  // Aplicar filtros
  // ============================================================
  const aplicarFiltros = async (event) => {
    event?.preventDefault();

    limpiarAlerta();
    await cargarHistorial(filtros);
  };

  // ============================================================
  // Carga inicial
  // ============================================================
  useEffect(() => {
    cargarOpciones();
  }, [cargarOpciones]);

  useEffect(() => {
    cargarHistorial({
      usuario: '',
      fecha: '',
      estado: '',
      equipo: '',
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    opciones,

    usuarioId,
    setUsuarioId,
    equipoSeleccionado,
    setEquipoSeleccionado,
    equiposPrestamo,
    prestamoCreado,
    fecha,
    encargado,

    numeroBusqueda,
    cambiarNumeroBusqueda,
    devolucion,

    filtros,
    cambiarFiltro,
    historial,

    cargando,
    alerta,
    limpiarAlerta,

    agregarEquipo,
    quitarEquipo,
    confirmarPrestamo,

    buscarDevolucion,
    devolverIndividual,
    devolverCompleta,

    aplicarFiltros,
  };
}
