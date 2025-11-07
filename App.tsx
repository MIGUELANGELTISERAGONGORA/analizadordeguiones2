
import React, { useState, useMemo } from 'react';
import type { MasterKey, MovieKey } from './types';
import { analysisData } from './constants';
import Header from './components/Header';
import TheorySelector from './components/TheorySelector';
import TheoryContent from './components/TheoryContent';
import CaseStudySelector from './components/CaseStudySelector';
import AnalysisDisplay from './components/AnalysisDisplay';
import SynthesisChart from './components/SynthesisChart';
import AiAnalyzer from './components/AiAnalyzer';

const App: React.FC = () => {
    const [selectedMaster, setSelectedMaster] = useState<MasterKey | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<MovieKey | null>(null);

    const analysisContent = useMemo(() => {
        if (selectedMaster && selectedMovie) {
            return analysisData[selectedMaster][selectedMovie] || '';
        }
        return null;
    }, [selectedMaster, selectedMovie]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Header />
            <main>
                <section id="masters-section" className="mb-10">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">1. Elige una Perspectiva Teórica</h2>
                    <TheorySelector selectedMaster={selectedMaster} onSelect={setSelectedMaster} />
                </section>
                
                <section id="theories-content" className="mb-12 bg-white/60 p-6 md:p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 min-h-[250px]">
                    <TheoryContent selectedMaster={selectedMaster} />
                </section>

                <section id="casestudy-section" className="mb-10">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">2. Analiza un Caso de Estudio</h2>
                    <CaseStudySelector selectedMovie={selectedMovie} onSelect={setSelectedMovie} />
                </section>

                <section id="analysis-output" className="bg-white p-6 md:p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 min-h-[300px]">
                   <AnalysisDisplay content={analysisContent} />
                </section>

                <section id="synthesis-section" className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Síntesis Comparativa</h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">Este gráfico compara cómo cada película equilibra diferentes elementos narrativos y de marca. Muestra visualmente las distintas estrategias que utilizan para conectar con la audiencia, ya sea a través de una estructura rígida, un profundo desarrollo de personajes o potentes disparadores emocionales.</p>
                    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg ring-1 ring-gray-200">
                        <SynthesisChart />
                    </div>
                </section>

                <section id="ai-tool-section" className="mt-16">
                     <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">3. Analiza tu Propio Guion con la Aplicación Experimental</h2>
                     <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">Pega tu guion a continuación, selecciona la teoría que deseas aplicar y deja que la aplicación experimental creada por el profesor Miguelangel Tisera te ofrezca un análisis instantáneo con recomendaciones para mejorar tu narrativa.</p>
                     <AiAnalyzer />
                </section>
            </main>
        </div>
    );
};

export default App;
