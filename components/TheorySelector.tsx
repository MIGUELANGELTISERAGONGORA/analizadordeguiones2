
import React from 'react';
import type { MasterKey } from '../types';

interface TheorySelectorProps {
    selectedMaster: MasterKey | null;
    onSelect: (master: MasterKey) => void;
}

const masters: { key: MasterKey; name: string }[] = [
    { key: 'field', name: 'Syd Field' },
    { key: 'mckee', name: 'Robert McKee' },
    { key: 'sugarman', name: 'Joseph Sugarman' },
];

const TheorySelector: React.FC<TheorySelectorProps> = ({ selectedMaster, onSelect }) => {
    return (
        <div id="masters-nav" className="flex flex-wrap justify-center gap-3 md:gap-4">
            {masters.map(master => (
                <button
                    key={master.key}
                    onClick={() => onSelect(master.key)}
                    className={`px-5 py-2.5 font-semibold bg-white border-2 border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300 ${
                        selectedMaster === master.key ? 'bg-[#4A908A] text-white shadow-md' : ''
                    }`}
                >
                    {master.name}
                </button>
            ))}
        </div>
    );
};

export default TheorySelector;
