// Autor: Brayan Azofeifa

/**
 * Instancia global de fetch() con intercepción de errores.
 * Usa fetch(), maneja cookies de sesión y permite exportar archivos.
*/

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function customFetch(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    
    // Configuración fundamental para que las Cookies de sesión viajen al backend
    const defaultOptions = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, defaultOptions);

        // Manejo de exportación de archivos (PDF, JSON, XML) 
        if (options.responseType === 'blob') {
            return { data: await response.blob() };
        }

        const data = await response.json().catch(() => null);

        // Intercepción de Errores (401 Unauthorized, 403 Forbidden) 
        if (!response.ok) {
            
            // Si el backend rechaza la petición por falta de permisos o sesión expirada
            if (response.status === 401 || response.status === 403) {
                console.warn('Acceso denegado o sesión expirada.');
                
                try {
                    // Borramos datos residuales para asegurar el cierre de sesión 
                    localStorage.removeItem('gestion_auth_token');
                    localStorage.removeItem('gestion_usuario');
                } catch (e) {

                }
            }
            
            return Promise.reject({
                status: response.status,
                message: data?.message || 'Error en el servidor',
                data: data
            });
        }

        return { data };

    } catch (error) {
        return Promise.reject(error);
    }
}

// Objeto exportado con los métodos HTTP listos para usar en los Services
const api = {
    get: (endpoint, options) => customFetch(endpoint, { method: 'GET', ...options }),
    
    post: (endpoint, body, options) => customFetch(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
    
    put: (endpoint, body, options) => customFetch(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
    
    delete: (endpoint, options) => customFetch(endpoint, { method: 'DELETE', ...options })
};

export default api;