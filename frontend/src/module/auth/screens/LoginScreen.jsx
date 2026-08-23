// Autor: Greivin Eliecer A.G

import { useLogin } from '../hooks/useLogin';
import Link from '../../../shared/components/Link';
import AuthCard from '../../../shared/components/AuthCard';
import TextInput from '../../../shared/components/TextInput';
import PasswordField from '../../../shared/components/PasswordField';
import Checkbox from '../../../shared/components/Checkbox';
import Button from '../../../shared/components/Button';
import Titulo from '../../../shared/components/Titulo';
import '../styles/wallpaper.css';

export default function Login() {
    const { formData, handleChange, handleSubmit, loading, error } = useLogin();

    return (
        <div className=" login-page d-flex align-items-center justify-content-center vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <AuthCard>
                            <div className="mb-4">
                                <Titulo
                                    tipografia="h4"
                                    texto="Iniciar sesión"
                                    alineado="left"
                                    color_text="black"
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                <TextInput
                                    id="identificador"
                                    name="identificador"
                                    label="Usuario o correo electrónico"
                                    placeholder="Usuario o correo electrónico"
                                    value={formData.identificador}
                                    onChange={handleChange}
                                    required
                                />

                                <PasswordField
                                    id="password"
                                    name="password"
                                    label="Contraseña"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                                    <Checkbox
                                        id="rememberMe"
                                        name="rememberMe"
                                        label="Recordarme"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                    />
                                    <Link href="/recuperar-password">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100"
                                    loading={loading}
                                >
                                    Ingresar
                                </Button>
                            </form>
                        </AuthCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
