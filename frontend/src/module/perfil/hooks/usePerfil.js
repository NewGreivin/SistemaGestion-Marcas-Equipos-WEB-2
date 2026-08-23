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

export const usePerfil = () => {
    const { actualizarUsuario } = useAuth();
    const [formData, setFormData] = useState({
        nombre_completo: '',
        fecha_nacimiento: '',
        departamento_id: '',
        correo: '',
        username: '',
        rol_nombre: '' 
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

                setFormData({
                    nombre_completo: perfil.nombre_completo || '',
                    fecha_nacimiento: formatearFechaParaInput(perfil.fecha_nacimiento),
                    departamento_id: String(perfil.departamento_id || ''),
                    correo: perfil.correo || '',
                    username: perfil.username || '',
                    rol_nombre: perfil.rol_nombre || 'Usuario' 
                });
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

        setErrores(nuevosErrores);

        const hayErrores = Object.keys(nuevosErrores).length > 0;
        if (hayErrores) {
            setAlerta({ visible: true, mensaje: 'Por favor, completa los campos en rojo.', tipo: 'danger' });
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
            setAlerta({ visible: true, mensaje: 'Tu perfil ha sido actualizado correctamente.', tipo: 'success' });
            setTimeout(() => setAlerta({ visible: false, mensaje: '', tipo: '' }), 3500);
        } catch (error) {
            setAlerta({ visible: true, mensaje: error.message || 'Error al guardar los cambios.', tipo: 'danger' });
        } finally {
            setGuardando(false);
        }
    };

    return { formData, errores, cargando, guardando, departamentos, alerta, handleChange, handleGuardar };
};