// Autor: Greivin Eliecer A.G

import { useState, useEffect } from 'react';
import api from '../../../api/api';

const formatearFechaParaInput = (fecha) => {
    if (!fecha) return '';

    if (fecha instanceof Date) {
        return fecha.toISOString().split('T')[0];
    }

    if (typeof fecha === 'string' && fecha.includes('T')) {
        return fecha.split('T')[0];
    }

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
    rol_id: '2',
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

    const esEdicion = Boolean(usuarioEditar);

    useEffect(() => {
        if (isOpen) {
            api.get('/departamentos')
                .then((res) => {
                    const lista = res.data.data || [];
                    setDepartamentos(
                        lista.map((d) => ({
                            value: String(d.id),
                            label: d.nombre,
                        }))
                    );
                })
                .catch(() => setDepartamentos([]));
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setErrores({});
            if (usuarioEditar) {
                setFormData({
                    ...crearEstadoInicial(), // Base limpia
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

        if (!formData.nombre_completo.trim())
            nuevosErrores.nombre_completo = 'El nombre completo es requerido.';
        else if (formData.nombre_completo.trim().length > 150)
            nuevosErrores.nombre_completo = 'Máximo 150 caracteres.';

        if (!formData.correo.trim())
            nuevosErrores.correo = 'El correo es requerido.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo))
            nuevosErrores.correo = 'Formato de correo no válido.';
        else if (formData.correo.length > 150)
            nuevosErrores.correo = 'Máximo 150 caracteres.';

        if (!formData.username.trim())
            nuevosErrores.username = 'El nombre de usuario es requerido.';
        else if (formData.username.length < 3)
            nuevosErrores.username = 'Mínimo 3 caracteres.';
        else if (formData.username.length > 50)
            nuevosErrores.username = 'Máximo 50 caracteres.';

        if (!formData.fecha_nacimiento)
            nuevosErrores.fecha_nacimiento =
                'La fecha de nacimiento es requerida.';
        if (!formData.departamento_id)
            nuevosErrores.departamento_id =
                'Debes seleccionar un departamento.';
        if (!formData.rol_id)
            nuevosErrores.rol_id = 'Debes seleccionar un rol.';

        const validarPass = !esEdicion || formData.password.length > 0;
        if (validarPass) {
            if (!formData.password) {
                nuevosErrores.password = 'La contraseña es requerida.';
            } else {
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
            if (formData.password !== formData.confirmar_password) {
                nuevosErrores.confirmar_password =
                    'Las contraseñas no coinciden.';
            }
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async () => {
        if (!validar()) return;
        setCargando(true);
        let datosParaEnviar;
        if (esEdicion) {
            const { confirmar_password: _c, ...resto } = formData;
            if (!resto.password) delete resto.password;
            datosParaEnviar = resto;
        } else {
            datosParaEnviar = { ...formData };
        }
        await onGuardar(datosParaEnviar);
        setCargando(false);
    };

    return {
        formData,
        errores,
        cargando,
        esEdicion,
        departamentos,
        handleChange,
        handleSubmit,
    };
};
