// Autor: Greivin Eliecer A.G

import FormModal from '../../../shared/components/FormModal';
import TextInput from '../../../shared/components/TextInput';
import Select from '../../../shared/components/Select';
import PasswordField from '../../../shared/components/PasswordField';
import { useUsuarioForm } from '../hooks/useUsuarioForm';

export default function UsuarioModal({ isOpen, onClose, usuarioEditar, onGuardar }) {
    const { formData, errores, cargando, esEdicion, departamentos, handleChange, handleSubmit } = useUsuarioForm({
        isOpen,
        usuarioEditar,
        onGuardar
    });

    if (!formData) return null;
    
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={esEdicion ? "Editar Usuario" : "Registrar Nuevo Usuario"}
            submitText={esEdicion ? "Actualizar Usuario" : "Guardar Usuario"}
            loading={cargando}
            size="lg"
        >
            <form id="form-modal-content" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="row">

                    {/* Nombre Completo */}
                    <div className="col-md-6">
                        <TextInput
                            id="nombre_completo" name="nombre_completo"
                            label="Nombre Completo" placeholder="Ej: Juan Pérez"
                            value={formData.nombre_completo} onChange={handleChange}
                            required error={errores.nombre_completo}
                        />
                    </div>

                    {/* Correo */}
                    <div className="col-md-6">
                        <TextInput
                            id="correo" name="correo"
                            label="Correo Electrónico" placeholder="Ej: juan@utn.ac.cr"
                            value={formData.correo} onChange={handleChange}
                            required error={errores.correo}
                        />
                    </div>

                    {/* Username */}
                    <div className="col-md-6">
                        <TextInput
                            id="username" name="username"
                            label="Nombre de Usuario" placeholder="Ej: jperez"
                            value={formData.username} onChange={handleChange}
                            required error={errores.username}
                        />
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div className="col-md-6">
                        <label htmlFor="fecha_nacimiento" className="form-label fw-semibold">
                            Fecha de Nacimiento <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date" id="fecha_nacimiento" name="fecha_nacimiento"
                            className={`form-control mb-1 ${errores.fecha_nacimiento ? 'is-invalid' : ''}`}
                            value={formData.fecha_nacimiento} onChange={handleChange} required
                        />
                        {errores.fecha_nacimiento && (
                            <div className="invalid-feedback d-block mb-2">{errores.fecha_nacimiento}</div>
                        )}
                    </div>

                    {/* Departamento */}
                    <div className="col-md-6">
                        <Select
                            id="departamento_id" name="departamento_id"
                            label="Departamento / Carrera"
                            value={formData.departamento_id} onChange={handleChange}
                            required error={errores.departamento_id}
                            options={departamentos}
                            placeholder="Selecciona un departamento"
                        />
                    </div>

                    {/* Rol */}
                    <div className="col-md-6">
                        <Select
                            id="rol_id" name="rol_id"
                            label="Rol del Sistema"
                            value={formData.rol_id} onChange={handleChange}
                            required
                            options={[
                                { value: '1', label: 'Administrador' },
                                { value: '2', label: 'Usuario' }
                            ]}
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="col-md-6">
                        <PasswordField
                            id="password" name="password"
                            label={esEdicion ? "Nueva Contraseña (Opcional)" : "Contraseña"}
                            placeholder="Mínimo 8 caracteres"
                            value={formData.password} onChange={handleChange}
                            required={!esEdicion} error={errores.password}
                        />
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="col-md-6">
                        <PasswordField
                            id="confirmar_password" name="confirmar_password"
                            label="Confirmar Contraseña"
                            placeholder="Repite la contraseña"
                            value={formData.confirmar_password} onChange={handleChange}
                            required={!esEdicion} error={errores.confirmar_password}
                        />
                    </div>

                </div>
            </form>
        </FormModal>
    );
}