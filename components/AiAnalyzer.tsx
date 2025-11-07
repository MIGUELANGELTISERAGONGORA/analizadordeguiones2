import React, { useState } from 'react';
import { analyzeScriptWithGemini } from '../services/geminiService';
import type { MasterKey } from '../types';

// Declarations for CDN libraries
declare const jspdf: any;
declare const html2canvas: any;

const AiAnalyzer: React.FC = () => {
    const [script, setScript] = useState('');
    const [theory, setTheory] = useState<MasterKey>('field');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');

    const theoryOptions = [
        { value: 'field', label: 'Syd Field' },
        { value: 'mckee', label: 'Robert McKee' },
        { value: 'sugarman', label: 'Joseph Sugarman' },
    ];

    const handleSubmit = async () => {
        if (!script.trim()) {
            setError('Por favor, introduce un guion para analizar.');
            return;
        }
        setError('');
        setAnalysis('');
        setIsLoading(true);

        const selectedTheoryLabel = theoryOptions.find(opt => opt.value === theory)?.label || 'seleccionada';
        const result = await analyzeScriptWithGemini(script, selectedTheoryLabel);
        
        if(result.startsWith('Error')){
            setError(result);
        } else {
            setAnalysis(result);
        }

        setIsLoading(false);
    };

    const handleDownloadPdf = async () => {
        if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
            setError("Error: Las librerías para generar PDF no se cargaron correctamente. Por favor, refresca la página e inténtalo de nuevo.");
            return;
        }

        const { jsPDF } = jspdf;
        const input = document.getElementById('analysis-content-to-pdf');

        if (input) {
            setIsDownloading(true);
            try {
                const canvas = await html2canvas(input, { 
                    scale: 2,
                    backgroundColor: '#ffffff'
                });
                const imgData = canvas.toDataURL('image/png');
        
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgProps = pdf.getImageProperties(imgData);
                const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
                let heightLeft = imgHeight;
                let position = 0;
                const topMargin = 25;
                const leftMargin = 10;
                const contentWidth = pdfWidth - (leftMargin * 2);
                const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

                pdf.setFontSize(18);
                pdf.text('Análisis del Profesor Miguelangel Tisera', pdfWidth / 2, 15, { align: 'center' });

                pdf.addImage(imgData, 'PNG', leftMargin, topMargin, contentWidth, contentHeight);
                heightLeft -= (pdfHeight - topMargin);
        
                while (heightLeft > 0) {
                    position = heightLeft - contentHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', leftMargin, -position, contentWidth, contentHeight);
                    heightLeft -= pdfHeight;
                }
        
                pdf.save('analisis-guion.pdf');
            } catch (e) {
                console.error("PDF generation error:", e);
                setError("Ocurrió un error al generar el PDF.");
            } finally {
                setIsDownloading(false);
            }
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg ring-1 ring-gray-200">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mb-6">
                <div className="flex-grow">
                    <label htmlFor="script-input" className="block text-sm font-medium text-gray-700">Pega tu guion aquí:</label>
                    <textarea
                        id="script-input"
                        rows={10}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A908A] focus:ring-[#4A908A] border p-2"
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="md:w-1/3 space-y-4">
                    <div>
                        <label htmlFor="theory-select" className="block text-sm font-medium text-gray-700">Selecciona la teoría para el análisis:</label>
                        <select
                            id="theory-select"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A908A] focus:ring-[#4A908A] border p-2"
                            value={theory}
                            onChange={(e) => setTheory(e.target.value as MasterKey)}
                            disabled={isLoading}
                        >
                            {theoryOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        id="analyze-btn"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-[#4A908A] text-white font-semibold py-2.5 px-4 rounded-full shadow-lg hover:bg-[#3d7a74] transition-colors duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                           <>
                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             <span>Analizando...</span>
                           </>
                        ) : (
                            <span>Analizar Guion</span>
                        )}
                    </button>
                </div>
            </div>
            <div className="mt-6 min-h-[100px]">
                {isLoading && <div className="bg-gray-50 p-6 rounded-lg border border-gray-200"><p className="text-center text-gray-500 animate-pulse">Analizando tu guion con la aplicación experimental...</p></div>}
                {error && <div className="bg-red-50 p-6 rounded-lg border border-red-200"><p className="text-red-600 text-sm font-medium text-center">{error}</p></div>}
                {!isLoading && !error && !analysis && <div className="bg-gray-50 p-6 rounded-lg border border-gray-200"><p className="text-gray-500 text-sm">El análisis de la aplicación experimental del Profesor Miguelangel Tisera aparecerá aquí.</p></div>}
                {analysis && (
                    <>
                        <div id="analysis-content-to-pdf" className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-xl font-bold mb-4 text-gray-800">Análisis de la Aplicación Experimental</h4>
                            <div className="prose prose-sm max-w-none text-gray-700" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }}></div>
                        </div>
                        <div className="text-center mt-6">
                            <button
                                onClick={handleDownloadPdf}
                                disabled={isDownloading}
                                className="bg-[#3d7a74] text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:bg-[#4A908A] transition-colors duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isDownloading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Descargando...</span>
                                    </>
                                ) : (
                                    <span>Descargar Análisis en PDF</span>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AiAnalyzer;
