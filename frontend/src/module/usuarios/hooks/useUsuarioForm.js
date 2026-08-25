// Autor: Greivin Eliecer A.G

import { useState, useEffect } from 'react';
import departamentosService from '../../departamentos/services/departamentos.service';
import { getRoles } from '../services/usuarios.service';
import { formatForSelect } from '../../../shared/utils/formatters';

const formatearFechaParaInput = (fecha) => {
    if (!fecha) return '';
    if (fecha instanceof Date) return fecha.toISOString().split('T')[0];
    if (typeof fecha === 'string' && fecha.includes('T'))
        return fecha.split('T')[0];
    if (typeof fecha === 'string' && fecha.includes('/')) {
        const [dia, mes, anio] = fecha.split('/');
        return `${anio}-${mes}-${dia}`;
    }
    return String(fecha);
};

const crearEstadoInicial = () => ({
    nombre_completo: '',
    correo: '',
    username: '',
    password: '',
    confirmar_password: '',
    fecha_nacimiento: '',
    rol_id: '',
    departamento_id: '',
});

const esPasswordSegura = (pass) => ({
    minimo8: pass.length >= 8,
    tieneMayuscula: /[A-Z]/.test(pass),
    tieneMinuscula: /[a-z]/.test(pass),
    tieneNumero: /[0-9]/.test(pass),
    tieneEspecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
});

export const useUsuarioForm = ({ isOpen, usuarioEditar, onGuardar }) => {
    const [formData, setFormData] = useState(crearEstadoInicial);
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorBackend, setErrorBackend] = useState('');

    const esEdicion = Boolean(usuarioEditar);

    useEffect(() => {
        if (isOpen) {
            setErrores({});

            getRoles()
                .then((lista) => setRoles(lista.map(r => ({ value: String(r.id), label: r.nombre }))))
                .catch(() => setRoles([]));

            departamentosService.getDepartamentos()
                .then((listaPura) => setDepartamentos(formatForSelect(listaPura, 'id', 'nombre')))
                .catch(() => setDepartamentos([]));
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setErrores({});

            if (usuarioEditar) {
                setFormData({
                    ...crearEstadoInicial(),
                    nombre_completo: usuarioEditar.nombre_completo || '',
                    correo: usuarioEditar.correo || '',
                    username: usuarioEditar.username || '',
                    password: '',
                    confirmar_password: '',
                    rol_id: String(usuarioEditar.rol_id || '2'),
                    departamento_id: String(
                        usuarioEditar.departamento_id || ''
                    ),
                    fecha_nacimiento: formatearFechaParaInput(
                        usuarioEditar.fecha_nacimiento
                    ),
                });
            } else {
                setFormData(crearEstadoInicial());
            }
        }
    }, [usuarioEditar, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores((prev) => ({ ...prev, [name]: '' }));
    };

    const validar = () => {
        const nuevosErrores = {};

        const checarVacio = (valor, campo) => {
            if (!valor || !String(valor).trim()) {
                nuevosErrores[campo] = true;
                return true;
            }
            return false;
        };

        const nombreVacio = checarVacio(
            formData.nombre_completo,
            'nombre_completo'
        );
        if (!nombreVacio && formData.nombre_completo.trim().length > 150)
            nuevosErrores.nombre_completo = 'Máximo 150 caracteres.';

        const correoVacio = checarVacio(formData.correo, 'correo');
        if (!correoVacio && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo))
            nuevosErrores.correo = 'Formato de correo no válido.';

        const userVacio = checarVacio(formData.username, 'username');
        if (!userVacio && formData.username.length < 3)
            nuevosErrores.username = 'Mínimo 3 caracteres.';
        else if (!userVacio && formData.username.length > 50)
            nuevosErrores.username = 'Máximo 50 caracteres.';

        checarVacio(formData.fecha_nacimiento, 'fecha_nacimiento');
        checarVacio(formData.departamento_id, 'departamento_id');
        checarVacio(formData.rol_id, 'rol_id');

        const validarPass = !esEdicion || formData.password.length > 0;
        if (validarPass) {
            const passVacio = checarVacio(formData.password, 'password');
            if (!passVacio) {
                const reglas = esPasswordSegura(formData.password);
                if (!reglas.minimo8)
                    nuevosErrores.password = 'Mínimo 8 caracteres.';
                else if (!reglas.tieneMayuscula)
                    nuevosErrores.password =
                        'Debe tener al menos una mayúscula.';
                else if (!reglas.tieneMinuscula)
                    nuevosErrores.password =
                        'Debe tener al menos una minúscula.';
                else if (!reglas.tieneNumero)
                    nuevosErrores.password = 'Debe tener al menos un número.';
                else if (!reglas.tieneEspecial)
                    nuevosErrores.password =
                        'Debe tener al menos un carácter especial.';
            }

            const confVacio = checarVacio(
                formData.confirmar_password,
                'confirmar_password'
            );

            if (
                !passVacio &&
                !confVacio &&
                formData.password !== formData.confirmar_password
            ) {
                nuevosErrores.confirmar_password =
                    'Las contraseñas no coinciden.';
            }
        }

        setErrores(nuevosErrores);

        const hayErrores = Object.keys(nuevosErrores).length > 0;

        return !hayErrores;
    };

    const handleSubmit = async () => {
        if (!validar()) return;
        setCargando(true);
        setErrorBackend('');

        try {
            let datosParaEnviar;
            if (esEdicion) {
                const { confirmar_password: _c, ...resto } = formData;
                if (!resto.password) delete resto.password;
                datosParaEnviar = resto;
            } else {
                datosParaEnviar = { ...formData };
            }

            await onGuardar(datosParaEnviar);
        } catch (error) {
            setErrorBackend(
                error.message || 'Error inesperado en el servidor.'
            );
            setTimeout(() => setErrorBackend(''), 4000);
        } finally {
            setCargando(false);
        }
    };

    return {
        formData,
        errores,
        errorBackend,
        cargando,
        esEdicion,
        departamentos,
        roles,
        handleChange,
        handleSubmit,
    };
};
