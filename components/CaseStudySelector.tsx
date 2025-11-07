
import React from 'react';
import type { MovieKey } from '../types';

interface CaseStudySelectorProps {
    selectedMovie: MovieKey | null;
    onSelect: (movie: MovieKey) => void;
}

const movies: { key: MovieKey; name: string }[] = [
    { key: 'air', name: 'Air' },
    { key: 'barbie', name: 'Barbie' },
    { key: 'mario', name: 'Super Mario Bros' },
];

const CaseStudySelector: React.FC<CaseStudySelectorProps> = ({ selectedMovie, onSelect }) => {
    return (
        <div id="movie-nav" className="flex flex-wrap justify-center gap-3 md:gap-4">
            {movies.map(movie => (
                <button
                    key={movie.key}
                    onClick={() => onSelect(movie.key)}
                    className={`px-5 py-2.5 font-semibold bg-white border-2 border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300 ${
                        selectedMovie === movie.key ? 'bg-[#4A908A] text-white shadow-md' : ''
                    }`}
                >
                    {movie.name}
                </button>
            ))}
        </div>
    );
};

export default CaseStudySelector;
