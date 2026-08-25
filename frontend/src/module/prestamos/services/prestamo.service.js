/**
 * Autor: Marisol Alfaro
 * Descripción: Centraliza las solicitudes del módulo de préstamos,
 * devoluciones e historial de préstamos.
 * Uso: Es consumido por usePrestamos para comunicarse con la API.
 */

import api from '../../../api/api';

// ============================================================
// Opciones disponibles para préstamos
// ============================================================
export const obtenerOpcionesPrestamo = async () => {
  const response = await api.get('/prestamos/opciones');
  return response?.data?.data ?? response?.data ?? {
    usuarios: [],
    equipos: [],
  };
};

// ============================================================
// Crear préstamo
// ============================================================
export const crearPrestamo = async (usuarioId, equipos) => {
  const response = await api.post('/prestamos', {
    usuario_id: Number(usuarioId),
    equipos: equipos.map(Number),
  });

  return response?.data?.data ?? response?.data;
};

// ============================================================
// Consultar devolución
// ============================================================
export const obtenerEstadoDevolucion = async (prestamoId) => {
  const response = await api.get(`/devoluciones/${prestamoId}`);
  return response?.data?.data ?? response?.data;
};

// ============================================================
// Devolución individual
// ============================================================
export const devolverEquipo = async (prestamoId, equipoId) => {
  const response = await api.put(
    `/devoluciones/${prestamoId}/equipos/${equipoId}`,
    {},
  );

  return response?.data?.data ?? response?.data;
};

// ============================================================
// Devolución completa
// ============================================================
export const devolverPrestamoCompleto = async (prestamoId) => {
  const response = await api.put(
    `/devoluciones/${prestamoId}/completa`,
    {},
  );

  return response?.data?.data ?? response?.data;
};

// ============================================================
// Historial de préstamos
// ============================================================
export const obtenerHistorial = async (filtros = {}) => {
  const params = new URLSearchParams();

  Object.entries(filtros).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  const query = params.toString();

  const response = await api.get(
    `/historial${query ? `?${query}` : ''}`,
  );

  return response?.data?.data ?? response?.data ?? [];
};
