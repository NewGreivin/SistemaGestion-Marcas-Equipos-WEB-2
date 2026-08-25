// Autor: Greivin Eliecer A.G
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Titulo from './Titulo';
import Texto from './Texto';
import Button from './Button';
import Icon from './icon';

export default function SessionExpiredModal() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleSessionExpired = () => setIsOpen(true);
        window.addEventListener('session-expired', handleSessionExpired);
        return () => window.removeEventListener('session-expired', handleSessionExpired);
    }, []);

    const handleLoginRedirect = () => {
        setIsOpen(false);
        navigate('/login', { replace: true });
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block bg-black bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content border-0 shadow">

                    <div className="modal-header border-0 pb-0">
                        <div className="d-flex align-items-center gap-2">
                            <Icon name="advertencia" className="text-danger fs-5" />
                            <Titulo
                                tipografia="h5"
                                texto="Sesión Expirada"
                                className="mb-0"
                                color_text="black"
                            />
                        </div>
                    </div>

                    <div className="modal-body pt-2 pb-0">
                        <Texto
                            texto="Tu sesión ha finalizado por seguridad o inactividad."
                            color_text="black"
                            alineado="left"
                        />
                        <Texto
                            texto="Por favor, vuelve a iniciar sesión para continuar en el sistema."
                            color_text="grey"
                            alineado="left"
                            tamano_letra="6"
                        />
                    </div>

                    <div className="modal-footer border-0 pt-3">
                        <Button variant="primary" onClick={handleLoginRedirect}>
                            Ir al inicio de sesión
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}