// Autor: Greivin Eliecer A.G

import { useRecuperarPassword } from '../hooks/useRecuperarPassword';
import Link from '../../../shared/components/Link';
import AuthCard from '../../../shared/components/AuthCard';
import TextInput from '../../../shared/components/TextInput';
import Button from '../../../shared/components/Button';
import Titulo from '../../../shared/components/Titulo';
import Texto from '../../../shared/components/Texto';
import '../styles/wallpaper.css';

export default function RecuperarPassword() {
    const {
        identificador,
        handleChange,
        handleSubmit,
        loading,
        error,
        successMessage,
    } = useRecuperarPassword();

    return (
        <div className="login-page d-flex align-items-center justify-content-center vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <AuthCard>
                            <div className="mb-4">
                                <Titulo
                                    tipografia="h4"
                                    texto="Recuperar contraseña"
                                    alineado="left"
                                    color_text="black"
                                />
                                <Texto
                                    texto="Ingresa tu correo y te enviaremos un token para restablecerla."
                                    alineado="left"
                                    color_text="gray"
                                    tamano_letra="6"
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}
                                {successMessage && (
                                    <div className="alert alert-success">
                                        {successMessage}
                                    </div>
                                )}

                                <TextInput
                                    id="identificador"
                                    name="identificador"
                                    label="Correo electrónico"
                                    placeholder="usuario@institucion.edu"
                                    value={identificador}
                                    onChange={handleChange}
                                    type="email"
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100 mb-4 mt-3"
                                    loading={loading}
                                >
                                    Enviar token
                                </Button>

                                <div className="text-center mt-3">
                                    <Link href="/login">
                                        &larr; Volver al inicio de sesión
                                    </Link>
                                </div>
                            </form>
                        </AuthCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
