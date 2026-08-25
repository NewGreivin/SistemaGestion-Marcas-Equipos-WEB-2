// Autor: Greivin Arguedas
import * as configDao from '../daos/configuracion.dao.js';

const ipEnRango = (ip, rango) => {
    if (!rango) return true;
    try {
        const [red, bits] = rango.split('/');
        
        if(!bits) return ip === red;

        const mascara = ~(0xFFFFFFFF >>> parseInt(bits));
        const ipNum = ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
        const redNum = red.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
        
        return (ipNum & mascara) === (redNum & mascara);
    } catch {
        return true;
    }
};

export const validarRangoIP = async (req, res, next) => {
    try {
        const config = await configDao.getConfig();
        const rango = config?.rango_ip_permitido;

        if (!rango) return next();

        let ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '';
        
        let ipLimpia = ip.replace('::ffff:', '');

        if (ipLimpia === '::1') ipLimpia = '127.0.0.1';

        if (ipLimpia === '127.0.0.1') return next();

        if (!ipEnRango(ipLimpia, rango)) {
            return res.status(403).json({
                success: false,
                message: `Acceso denegado. Tu IP (${ipLimpia}) no está dentro del rango permitido.`
            });
        }

        next();
    } catch (err) {
        next();
    }
};