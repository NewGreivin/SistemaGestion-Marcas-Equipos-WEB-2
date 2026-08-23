// Autor: Greivin Eliecer A.G

import Titulo from '../../../shared/components/Titulo';
import Texto from '../../../shared/components/Texto';
import Card from '../../../shared/components/Card';

export default function StatCard({ title, value, subtitle }) {
    return (
        <Card 
            responsivo={true} 
            className="border-0 shadow-sm h-100" 
            texto_alineado="left"
        >
            <div className="d-flex flex-column justify-content-between h-100">
                <Texto 
                    texto={title} 
                    alineado="left" 
                    color_text="black" 
                    className="fw-bold mb-3 text-uppercase" 
                    tamano_letra="6" 
                />
                <div>
                    <Titulo 
                        tipografia="h3" 
                        texto={value} 
                        alineado="left" 
                        color_text="black" 
                        className="fw-bold mb-0" 
                    />
                    <Texto 
                        texto={subtitle} 
                        alineado="left" 
                        color_text="gray" 
                        tamano_letra="6" 
                        className="mt-1"
                    />
                </div>
            </div>
        </Card>
    );
}