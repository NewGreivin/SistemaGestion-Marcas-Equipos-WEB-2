// Autor: Greivin Eliecer A.G

import Titulo from './Titulo';
import Button from './Button';

/**
 * FormModal — Modal base reutilizable para formularios.
 *
 * Props:
 *  - isOpen      {boolean}   Si true, muestra el modal
 *  - onClose     {function}  Se llama al presionar Cancelar o la X
 *  - onSubmit    {function}  Se llama al presionar el botón de guardar
 *  - title       {string}    Título del modal
 *  - submitText  {string}    Texto del botón guardar (Default: "Guardar")
 *  - cancelText  {string}    Texto del botón cancelar (Default: "Cancelar")
 *  - loading     {boolean}   Si true, muestra spinner en el botón guardar
 *  - size        {string}    Tamaño del modal: 'sm' | '' | 'lg' | 'xl' (Default: 'lg')
 *  - children    {ReactNode} El formulario va aquí dentro
 */
export default function FormModal({
    isOpen,
    onClose,
    onSubmit,
    title = "Formulario",
    submitText = "Guardar",
    cancelText = "Cancelar",
    loading = false,
    size = "lg",
    children
}) {
    if (!isOpen) return null;

    const sizeClass = size ? `modal-${size}` : '';

    return (
        <div
            className="modal fade show d-block bg-black bg-opacity-50"
            tabIndex="-1"
        >
            <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${sizeClass}`}>
                <div className="modal-content border-0 shadow">

                    <div className="modal-header border-bottom">
                        <Titulo
                            tipografia="h5"
                            texto={title}
                            className="mb-0"
                            color_text="black"
                        />
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Cerrar"
                            disabled={loading}
                        />
                    </div>

                    <div className="modal-body py-4">
                        {children}
                    </div>

                    <div className="modal-footer border-top">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            type="submit"
                            form="form-modal-content"
                            variant="primary"
                            loading={loading}
                            onClick={onSubmit}
                        >
                            {submitText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}