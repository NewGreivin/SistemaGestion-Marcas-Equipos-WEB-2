// Autor: Brayan Azofeifa

/**
 * Instancia global de fetch() con intercepción de errores.
 * Usa fetch(), maneja cookies de sesión y permite exportar archivos.
*/

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function customFetch(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    
    const headers = { ...options.headers };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }

    const defaultOptions = {
        ...options,
        credentials: 'include',
        headers,
    };

    try {
        const response = await fetch(url, defaultOptions);

        if (options.responseType === 'blob') {
            return { data: await response.blob() };
        }

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.warn('Acceso denegado o sesión expirada.');
                
                try {
                    localStorage.removeItem('gestion_auth_token');
                    localStorage.removeItem('gestion_usuario');
                } catch (e) {
                    // Lo ignoramos
                }

                window.dispatchEvent(new Event('session-expired'));
            }

            throw {
                status: response.status,
                message: data?.message || 'Error en el servidor',
                data: data
            };
        }

        return { data };

    } catch (error) {
        return Promise.reject(error);
    }
}

const api = {
    get: (endpoint, options) => 
        customFetch(endpoint, { method: 'GET', ...options }),
    
    post: (endpoint, body, options) => 
        customFetch(endpoint, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body), ...options }),
    
    put: (endpoint, body, options) => 
        customFetch(endpoint, { method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body), ...options }),
    
    delete: (endpoint, options) => 
        customFetch(endpoint, { method: 'DELETE', ...options })
};

export default api;
    