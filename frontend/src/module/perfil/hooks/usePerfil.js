import { useState, useEffect } from 'react';
import perfilService from '../services/perfil.service';
import departamentosService from '../../departamentos/services/departamentos.service';
import { formatForSelect } from '../../../shared/utils/formatters';
import useAuth from '../../auth/hooks/useAuth';

const formatearFechaParaInput = (fecha) => {
    if (!fecha) return '';
    if (typeof fecha === 'string' && fecha.includes('T')) return fecha.split('T')[0];
    return String(fecha);
};

const esPasswordSegura = (pass) => ({
    minimo8: pass.length >= 8,
    tieneMayuscula: /[A-Z]/.test(pass),
    tieneMinuscula: /[a-z]/.test(pass),
    tieneNumero: /[0-9]/.test(pass),
    tieneEspecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
});

export const usePerfil = () => {
    const { actualizarUsuario } = useAuth();
    const [formData, setFormData] = useState({
        nombre_completo: '',
        fecha_nacimiento: '',
        departamento_id: '',
        correo: '',
        username: '',
        rol_nombre: '',
        passwordActual: '',
        nuevaPassword: '',
        confirmacionNuevaPassword: ''
    });
    
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: '' });

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            try {
                const [resPerfil, listaDeptosPura] = await Promise.all([
                    perfilService.getPerfil(),
                    departamentosService.getDepartamentos() 
                ]);

                const perfil = resPerfil.data || resPerfil;
                const opcionesDeptos = formatForSelect(listaDeptosPura, 'id', 'nombre');
                setDepartamentos(opcionesDeptos);

                setFormData(prev => ({
                    ...prev,
                    nombre_completo: perfil.nombre_completo || '',
                    fecha_nacimiento: formatearFechaParaInput(perfil.fecha_nacimiento),
                    departamento_id: String(perfil.departamento_id || ''),
                    correo: perfil.correo || '',
                    username: perfil.username || '',
                    rol_nombre: perfil.rol_nombre || 'Usuario' 
                }));
            } catch (error) {
                setAlerta({ visible: true, mensaje: 'Error al cargar tu información.', tipo: 'danger' });
            } finally {
                setCargando(false);
            }
        };
        cargarDatosIniciales();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: '' }));
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

        const nombreVacio = checarVacio(formData.nombre_completo, 'nombre_completo');
        if (!nombreVacio && formData.nombre_completo.length > 150) {
            nuevosErrores.nombre_completo = 'Máximo 150 caracteres.';
        }
        checarVacio(formData.fecha_nacimiento, 'fecha_nacimiento');
        checarVacio(formData.departamento_id, 'departamento_id');

        const intentaCambiarPassword = formData.passwordActual || formData.nuevaPassword || formData.confirmacionNuevaPassword;
        
        if (intentaCambiarPassword) {
            checarVacio(formData.passwordActual, 'passwordActual');
            const nuevaVacia = checarVacio(formData.nuevaPassword, 'nuevaPassword');
            const confVacia = checarVacio(formData.confirmacionNuevaPassword, 'confirmacionNuevaPassword');

            if (!nuevaVacia) {
                const reglas = esPasswordSegura(formData.nuevaPassword);
                if (!reglas.minimo8) nuevosErrores.nuevaPassword = 'Mínimo 8 caracteres.';
                else if (!reglas.tieneMayuscula) nuevosErrores.nuevaPassword = 'Al menos una mayúscula.';
                else if (!reglas.tieneMinuscula) nuevosErrores.nuevaPassword = 'Al menos una minúscula.';
                else if (!reglas.tieneNumero) nuevosErrores.nuevaPassword = 'Al menos un número.';
                else if (!reglas.tieneEspecial) nuevosErrores.nuevaPassword = 'Al menos un carácter especial.';
            }

            if (!nuevaVacia && !confVacia && formData.nuevaPassword !== formData.confirmacionNuevaPassword) {
                nuevosErrores.confirmacionNuevaPassword = 'Las contraseñas no coinciden.';
            }
        }

        setErrores(nuevosErrores);
        const hayErrores = Object.keys(nuevosErrores).length > 0;
        
        if (hayErrores) {
            setAlerta({ visible: true, mensaje: 'Por favor, corrige los campos marcados.', tipo: 'danger' });
            setTimeout(() => setAlerta({ visible: false, mensaje: '', tipo: '' }), 3500);
        }
        return !hayErrores;
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        setGuardando(true);
        try {
            await perfilService.updatePerfil({
                nombre_completo: formData.nombre_completo,
                fecha_nacimiento: formData.fecha_nacimiento,
                departamento_id: formData.departamento_id
            });
            actualizarUsuario({ nombre_completo: formData.nombre_completo });

            if (formData.passwordActual && formData.nuevaPassword) {
                await perfilService.changePassword({
                    passwordActual: formData.passwordActual,
                    nuevaPassword: formData.nuevaPassword,
                    confirmacionNuevaPassword: formData.confirmacionNuevaPassword
                });
                
                setFormData(prev => ({ ...prev, passwordActual: '', nuevaPassword: '', confirmacionNuevaPassword: '' }));
            }

            setAlerta({ visible: true, mensaje: 'Cambios guardados correctamente.', tipo: 'success' });
            setTimeout(() => setAlerta({ visible: false, mensaje: '', tipo: '' }), 3500);
        } catch (error) {
            setAlerta({ visible: true, mensaje: error.message || 'Error al guardar los cambios.', tipo: 'danger' });
        } finally {
            setGuardando(false);
        }
    };

    return { formData, errores, cargando, guardando, departamentos, alerta, handleChange, handleGuardar };
};