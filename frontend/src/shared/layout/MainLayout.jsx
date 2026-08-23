//Autor: Greivin Eliecer A.G
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout() {
    return (
        <div className="d-flex flex-column vh-100 overflow-hidden bg-light">
            <Navbar />
            <div className="d-flex flex-grow-1 overflow-hidden">
                <Sidebar />
                <main className="flex-grow-1 p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
