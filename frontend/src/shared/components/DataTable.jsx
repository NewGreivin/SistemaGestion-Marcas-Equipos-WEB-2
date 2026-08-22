//Autor: Ricardo Chaves

//Utilizacion: 

/* const equipos = [
    {
        id: 1,
        codigo: "EQ-001",
        descripcion: "Proyector Epson PowerLite X41",
        estado: "DISPONIBLE"
    },
];

const columns = [
    {
        key: "codigo",
        label: "CÓDIGO"
    },
    {
        key: "descripcion",
        label: "DESCRIPCIÓN"
    }
];

const actions = [
    {
        icon: "editar",
        variant: "outline-primary",
        label: "Editar",
        onClick: (equipo) => {
            console.log("Editar:", equipo);
            alert(`Editar ${equipo.codigo}`);
        }
    }
]; */

import IconButton from "./IconButton";

export default function Table({ columns, data, actions = [], className = "" }) {
    return (
        <div className={`table-responsive ${className}`}>
            <table className="table table-hover align-middle">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                            </th>
                        ))}

                        {actions.length > 0 && (
                            <th className="text-end">
                                ACCIONES
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id ?? index}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {item[column.key]}
                                </td>
                            ))}

                            {actions.length > 0 && (
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        {actions.map((action, actionIndex) => (
                                            <IconButton
                                                key={actionIndex}
                                                icon={action.icon}
                                                variant={action.variant}
                                                onClick={() => action.onClick(item)}
                                                title={action.label}
                                                aria-label={action.label}
                                            />
                                        ))}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}