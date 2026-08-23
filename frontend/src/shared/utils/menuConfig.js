//Autor: Greivin Eliecer A.G

/**
 * Configuración de las pestañas (tabs) y submenús del Sidebar.
 * Para agregar un nuevo módulo, simplemente añade un objeto a este arreglo.
 */

export const sidebarMenuConfig = [
  {
    id: "dashboardMenu",
    title: "Dashboard",
    iconName: "dashboard",    // Usar tu componente personalizado <Icon name="..." />
    expanded: false,              // true si quieres que inicie abierto por defecto
    subItems: [
      {
        path: "/dashboard",
        label: "Inicio",
        isBullet: true            // Usa un punto estilizado (•) en vez de icono
      }
    ]
  },
  {
    id: "marcasMenu",
    title: "Marcas y dispositivos",
    iconName: "marcas",
    expanded: false,
    subItems: [
      {
        path: "/marcas/registrar",
        label: "Registrar marca",
        isBullet: true
      },
      {
        path: "/marcas/dispositivos",
        label: "Ver dispositivos",
        isBullet: true
      },
      {
        path: "/marcas/historial",
        label: "Reporte de marcas",
        isBullet: true
      }
    ]
  },
  {
    id: "prestamosMenu",
    title: "Préstamo de equipos",
    iconName: "prestamo",
    expanded: false,
    subItems: [
      {
        path: "/prestamos/equipos",
        label: "Ver Equipos",
        isBullet: true
      },
      {
        path: "/prestamos/nuevo",
        label: "Registrar préstamo",
        isBullet: true
      },
      {
        path: "/prestamos/devolucion",
        label: "Devolución de equipos",
        isBullet: true
      },
      {
        path: "/prestamos/historial",
        label: "Historial de préstamos",
        isBullet: true
      }
    ]
  },  
  {
    id: "departamentosMenu",
    title: "Departamentos",
    iconName: "departamento",
    expanded: false,
    subItems: [
      {
        path: "/departamentos",
        label: "Gestión de departamentos",
        isBullet: true
      }
    ]
  },
  {
    id: "usuariosMenu",
    title: "Usuarios",
    iconName: "usuarios",
    expanded: false,
    subItems: [
      {
        path: "/usuarios",
        label: "Gestion de usuarios",
        isBullet: true
      }
    ]
  },
  {
    id: "configMenu",
    title: "Configuración",
    iconName: "configuracion",
    expanded: false,
    subItems: [
      {
        path: "/configuracion",
        label: "Ajustes generales",
        isBullet: true
      }
    ]
  }
];
