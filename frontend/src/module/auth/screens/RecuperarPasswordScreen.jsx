// Autor: Greivin Eliecer A.G

import { useRecuperarPassword } from '../hooks/useRecuperarPassword';
import Link from '../../../shared/components/Link';
import AuthCard from '../../../shared/components/AuthCard';
import TextInput from '../../../shared/components/TextInput';
import Button from '../../../shared/components/Button';
import Titulo from '../../../shared/components/Titulo';
import Texto from '../../../shared/components/Texto';
import PasswordField from '../../../shared/components/PasswordField';
import '../styles/wallpaper.css';

export default function RecuperarPassword() {
    const {
        paso,
        identificador, setIdentificador,
        codigo, setCodigo,
        nuevaPassword, setNuevaPassword,
        confirmacionPassword, setConfirmacionPassword,
        handleRequestCode,
        handleResetPassword,
        loading, error, successMessage,
    } = useRecuperarPassword();

    return (
        <div className="login-page d-flex align-items-center justify-content-center vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <AuthCard>
                            
                            {/* PASO 1: Pedir el Correo */}
                            {paso === 1 && (
                                <>
                                    <div className="mb-4">
                                        <Titulo tipografia="h4" texto="Recuperar contraseña" alineado="left" color_text="black" />
                                        <Texto texto="Ingresa tu correo y te enviaremos un código de seguridad para restablecerla." alineado="left" color_text="gray" tamano_letra="6" />
                                    </div>

                                    <form onSubmit={handleRequestCode}>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                                        <TextInput
                                            id="identificador"
                                            name="identificador"
                                            label="Correo electrónico"
                                            placeholder="usuario@institucion.edu"
                                            value={identificador}
                                            onChange={(e) => setIdentificador(e.target.value)}
                                            type="email"
                                            required
                                        />

                                        <Button type="submit" variant="primary" className="w-100 mb-4 mt-3" loading={loading}>
                                            Enviar código
                                        </Button>
                                    </form>
                                </>
                            )}

                            {/* PASO 2: Ingresar Código y Nueva Clave */}
                            {paso === 2 && (
                                <>
                                    <div className="mb-4">
                                        <Titulo tipografia="h4" texto="Crear nueva contraseña" alineado="left" color_text="black" />
                                        <Texto texto="Ingresa el código de 6 dígitos que enviamos a tu correo y tu nueva clave." alineado="left" color_text="gray" tamano_letra="6" />
                                    </div>

                                    <form onSubmit={handleResetPassword}>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {successMessage && <div className="alert alert-success text-center fw-bold">{successMessage}</div>}

                                        <TextInput
                                            id="codigo"
                                            name="codigo"
                                            label="Código de Seguridad"
                                            placeholder="123456"
                                            value={codigo}
                                            onChange={(e) => setCodigo(e.target.value)}
                                            required
                                        />

                                        <PasswordField
                                            id="nuevaPassword"
                                            name="nuevaPassword"
                                            label="Nueva Contraseña"
                                            placeholder="Mínimo 8 caracteres"
                                            value={nuevaPassword}
                                            onChange={(e) => setNuevaPassword(e.target.value)}
                                        />

                                        <PasswordField
                                            id="confirmacionPassword"
                                            name="confirmacionPassword"
                                            label="Confirmar Contraseña"
                                            placeholder="Repite tu contraseña"
                                            value={confirmacionPassword}
                                            onChange={(e) => setConfirmacionPassword(e.target.value)}
                                        />

                                        <Button type="submit" variant="primary" className="w-100 mb-4 mt-3" loading={loading}>
                                            Cambiar Contraseña
                                        </Button>
                                    </form>
                                </>
                            )}

                            <div className="text-center mt-3 border-top pt-3">
                                <Link href="/login">
                                    &larr; Volver al inicio de sesión
                                </Link>
                            </div>
                        </AuthCard>
                    </div>
                </div>
            </div>
        </div>
    );
}