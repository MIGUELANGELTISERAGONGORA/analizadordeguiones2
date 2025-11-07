
import React, { useState } from 'react';
import { paradigmDescriptions } from '../constants';

const points = ['Planteamiento', 'Primer Nudo', 'Confrontación', 'Segundo Nudo', 'Resolución'];

const SydFieldParadigm: React.FC = () => {
    const [info, setInfo] = useState<string | null>(null);

    const handlePointClick = (point: string) => {
        setInfo(paradigmDescriptions[point]);
    };

    return (
        <div>
            <div className="relative pt-8">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 rounded-full"></div>
                <div className="relative flex justify-between items-center">
                    {points.map((point) => (
                        <div
                            key={point}
                            className="text-center w-1/5 cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1"
                            onClick={() => handlePointClick(point)}
                        >
                            <div className={`mx-auto rounded-full border-4 border-white shadow-md ${
                                point === 'Confrontación' ? 'w-8 h-8 bg-amber-500' : 'w-6 h-6 bg-[#4A908A]'
                            }`}></div>
                            <p className={`mt-2 font-semibold text-sm ${point === 'Confrontación' ? 'font-bold' : ''}`}>
                                {point === 'Confrontación' ? 'Acto II: Confrontación' : point.includes('Nudo') ? point : `Acto ${point === 'Planteamiento' ? 'I' : 'III'}: ${point}`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div 
                className={`mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center transition-opacity duration-300 ${info ? 'opacity-100' : 'opacity-0'}`}
                dangerouslySetInnerHTML={{ __html: info || 'Selecciona un punto del paradigma para ver su descripción.' }}
            />
        </div>
    );
};

export default SydFieldParadigm;
