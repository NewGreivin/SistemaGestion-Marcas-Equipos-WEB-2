//Autor: Greivin Eliecer A.G

/**
 * Middleware global para el manejo de errores.
 * Atrapa errores técnicos (como los de MySQL) y los traduce a mensajes
 * amigables para que el frontend los pueda mostrar.
 */
const globalErrorHandler = (err, req, res, next) => {
    if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451) {
        return res.status(400).json({
            status: 'error',
            message: 'Este registro tiene información asociada en el sistema.'
        });
    }

    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
        return res.status(400).json({
            status: 'error',
            message: 'El dato que intentas guardar ya está registrado'
        });
    }

    if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
        return res.status(400).json({
            status: 'error',
            message: 'El registro al que intentas acceder no existe.'
        });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Error interno del servidor.'
    });
};

export default globalErrorHandler;