//Autor: Greivin Eliecer A.G
// Archivo: src/shared/utils/formatters.js

/**
 * Convierte un arreglo de la base de datos al formato { value, label } que usan los Select.
 * @param {Array} lista - Los datos crudos (ej. [{ id: 1, nombre: 'valor' }])
 * @param {string} valueKey - La propiedad que será el valor (por defecto 'id')
 * @param {string} labelKey - La propiedad que será el texto (por defecto 'nombre')
 */
export const formatForSelect = (lista, valueKey = 'id', labelKey = 'nombre') => {
    if (!Array.isArray(lista)) return [];
    
    return lista.map(item => ({
        value: String(item[valueKey]),
        label: item[labelKey]
    }));
};