
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                El Guion en las <span className="text-[#4A908A]">Brand Movies</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Aplicacion Experimental Creada por el Profesor Miguelangel Tisera</p>
            <p className="mt-1 text-lg text-gray-600 max-w-3xl mx-auto">Una guía interactiva para deconstruir el éxito narrativo de películas como 'Air', 'Barbie' y 'Super Mario Bros' a través de las teorías clásicas de guion y copywriting.</p>
        </header>
    );
};

export default Header;
