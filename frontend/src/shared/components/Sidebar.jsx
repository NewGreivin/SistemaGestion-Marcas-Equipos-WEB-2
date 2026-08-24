/**
 * Autor: Marisol Alfaro
 * Descripción: Barra lateral principal del sistema (Dinámica).
 * Uso: Permite desplegar y navegar entre las opciones de todos los módulos.
 */

import NavLink from './NavLink';
import Icon from './icon';
import Texto from './Texto';
import Button from './Button';
import { sidebarMenuConfig } from '../utils/menuConfig';
import useAuth from '../../module/auth/hooks/useAuth';

const Sidebar = () => {
    const { usuario } = useAuth();
    const esAdmin = usuario?.rol_nombre === 'Administrador';

    const menuVisible = sidebarMenuConfig
        .filter((menu) => {
            if (menu.soloAdmin && !esAdmin) return false;
            return true;
        })
        .map((menu) => {
            const subItemsFiltrados = menu.subItems.filter((subItem) => {
                if (subItem.soloAdmin && !esAdmin) return false;
                return true;
            });

            return {
                ...menu,
                subItems: subItemsFiltrados,
            };
        })
        .filter((menu) => menu.subItems.length > 0);

    return (
        <aside
            className="p-3 flex-shrink-0 h-100 overflow-auto shadow-sm bg-white border-end"
            style={{ width: '280px' }}
        >
            <Texto
                texto="MÓDULOS"
                alineado="left"
                color_text="black"
                tamano_letra="6"
                className="ps-2 mb-3 fw-bold mt-2"
            />

            {menuVisible.map((menu) => (
                <div className="mb-2" key={menu.id}>
                    <Button
                        type="button"
                        className="list-group-item list-group-item-action text-dark fw-semibold w-100 text-start justify-content-between border-0 rounded py-2 px-3 mb-1"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${menu.id}`}
                        aria-expanded={menu.expanded ? 'true' : 'false'}
                        aria-controls={menu.id}
                    >
                        <span className="d-flex align-items-center gap-2">
                            <Icon name={menu.iconName} />
                            {menu.title}
                        </span>
                        <Icon name="flechaAbajo" />
                    </Button>

                    <div
                        id={menu.id}
                        className={`collapse ${menu.expanded ? 'show' : ''}`}
                    >
                        <nav className="nav flex-column ms-3 mt-2">
                            {menu.subItems.map((subItem) => (
                                <NavLink
                                    key={subItem.path}
                                    to={subItem.path}
                                    className="nav-link text-dark d-flex align-items-center gap-2 rounded px-3 py-2"
                                    activeClassName="fw-bold bg-light"
                                >
                                    {subItem.isBullet ? (
                                        <span className="fs-5 lh-1">•</span>
                                    ) : (
                                        <Icon name={subItem.iconName} />
                                    )}
                                    {subItem.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;
