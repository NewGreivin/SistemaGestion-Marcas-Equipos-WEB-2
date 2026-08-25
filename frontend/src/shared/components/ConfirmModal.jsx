// Autor: Greivin Eliecer A.G

import Titulo from './Titulo';
import Texto from './Texto';
import Button from './Button';

/**
 * ConfirmModal — Modal de confirmación o alerta reutilizable.
 *
 * Props:
 *  - isOpen       {boolean}   Si true, muestra el modal
 *  - onClose      {function}  Se llama al presionar Cancelar o la X
 *  - onConfirm    {function}  Se llama al presionar el botón de confirmar.
 *                             Si no se pasa, el modal actúa como alerta simple.
 *  - title        {string}    Título del modal
 *  - message      {string}    Mensaje descriptivo
 *  - confirmText  {string}    Texto del botón de confirmar (Default: "Confirmar")
 *  - cancelText   {string}    Texto del botón de cancelar (Default: "Cancelar")
 *  - variant      {string}    Color del botón de confirmar: 'danger' | 'primary' | 'success' (Default: 'danger')
 */
export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Estás seguro?",
    message = "",
    submessage = "",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "danger"
}) {
    if (!isOpen) return null;
    const esSoloAlerta = !onConfirm;

    return (
        <div className="modal fade show d-block bg-black bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content border-0 shadow">

                    <div className="modal-header border-0 pb-0">
                        <Titulo tipografia="h5" texto={title} className="mb-0" color_text="black" />
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
                    </div>

                    {(message || submessage) && (
                        <div className="modal-body pt-2 pb-0">
                            {message && (
                                <Texto texto={message} color_text="black" alineado="left" />
                            )}
                            {submessage && (
                                <Texto texto={submessage} color_text="gray" alineado="left" tamano_letra="6" />
                            )}
                        </div>
                    )}

                    <div className="modal-footer border-0 pt-3">
                        {!esSoloAlerta && (
                            <Button variant="secondary" onClick={onClose}>{cancelText}</Button>
                        )}
                        <Button variant={variant} onClick={esSoloAlerta ? onClose : onConfirm}>
                            {esSoloAlerta ? "Entendido" : confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}