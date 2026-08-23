/**
 * Autor: Marisol Alfaro
 * Descripción: Barra superior visual del sistema.
 * Uso: Muestra la identidad del sistema y el menú del usuario autenticado.
 */

import Avatar from './Avatar';
import Texto from './Texto';
import Icon from './icon';
import NavLink from './NavLink';
import Button from './Button';
import Dropdown from './Dropdown';
import useAuth from '../../module/auth/hooks/useAuth';

const Navbar = () => {
    const { usuario, logout, loading } = useAuth();

    const nombre = usuario?.nombre_completo;
    const identificador = usuario?.username;
    const rol = usuario?.rol_nombre;

    return (
        <nav
            className="navbar navbar-dark px-4 py-2"
            style={{ backgroundColor: '#172745' }}
        >
            <div className="container-fluid">
                <div>
                    <Texto
                        texto="Bitácora Central"
                        color_text="white"
                        tamano_letra="5"
                        className="fw-bold navbar-brand mb-0 p-0"
                    />
                    <Texto
                        texto="CONTROL DE MARCAS Y PRÉSTAMOS"
                        color_text="secondary"
                        tamano_letra="6"
                        className="fw-semibold"
                    />
                </div>

                <Dropdown
                    className="border border-secondary border-opacity-50 rounded-3 px-3 py-2 bg-transparent gap-3"
                    trigger={
                        <>
                            <Avatar nombre={nombre} variant="success" />
                            <div className="d-flex flex-column text-start lh-sm">
                                <Texto
                                    texto={nombre}
                                    color_text="white"
                                    tamano_letra="6"
                                    className="fw-bold"
                                />
                                <Texto
                                    texto={rol}
                                    color_text="secondary"
                                    tamano_letra="6"
                                />
                            </div>
                        </>
                    }
                >
                    <li className="px-3 py-2 bg-light border-bottom">
                        <Texto className="text-muted" tamano_letra="6">
                            Conectado como <strong>{identificador}</strong>
                        </Texto>
                    </li>

                    <li>
                        <NavLink
                            to="/perfil"
                            className="dropdown-item d-flex align-items-center gap-2 py-2 text-dark"
                            activeClassName="fw-bold"
                        >
                            <Icon name="perfil" className="fs-5" />
                            Mi perfil
                        </NavLink>
                    </li>

                    <li>
                        <hr className="dropdown-divider my-0" />
                    </li>

                    <li>
                        <Button
                            onClick={logout}
                            disabled={loading}
                            className="dropdown-item text-danger d-flex align-items-center gap-2 py-2 border-0 bg-transparent w-100 text-start"
                        >
                            <Icon name="cerrarSesion" className="fs-5" />
                            {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
                        </Button>
                    </li>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
