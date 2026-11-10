
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isLibrary = location.pathname === '/library';

    return (
        <header className="App-header">
            <h1>Mi aplicación de música</h1>

            <nav>
                <button
                    onClick={() => navigate('/')}
                    disabled={isHome}
                >
                    Inicio
                </button>

                <button
                    onClick={() => navigate('/library')}
                    disabled={isLibrary}
                >
                    Biblioteca
                </button>
            </nav>
        </header>
    );
};

export default Header;
