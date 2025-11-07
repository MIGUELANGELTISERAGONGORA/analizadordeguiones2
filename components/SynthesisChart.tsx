import React, { useEffect, useRef } from 'react';
import type { Chart } from 'chart.js';

const SynthesisChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (typeof (window as any).Chart === 'undefined') {
            console.error('Chart.js library has not loaded yet.');
            return; // Exit if Chart.js is not available
        }

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                // Destroy previous chart instance if it exists
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const newChart = new (window as any).Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Estructura Clásica (Field)', 'Profundidad de Personaje (McKee)', 'Complejidad de Trama', 'Apelación Emocional (Sugarman)', 'Fidelidad a la Marca'],
                        datasets: [{
                            label: 'Air',
                            data: [9, 7, 6, 9, 8],
                            backgroundColor: 'rgba(74, 144, 138, 0.2)',
                            borderColor: 'rgba(74, 144, 138, 1)',
                            borderWidth: 2
                        }, {
                            label: 'Barbie',
                            data: [8, 9, 8, 10, 6],
                            backgroundColor: 'rgba(236, 72, 153, 0.2)',
                            borderColor: 'rgba(236, 72, 153, 1)',
                            borderWidth: 2
                        }, {
                            label: 'Super Mario Bros',
                            data: [7, 4, 4, 7, 10],
                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                            borderColor: 'rgba(239, 68, 68, 1)',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                                grid: { color: 'rgba(0, 0, 0, 0.1)' },
                                pointLabels: { font: { size: 12 } },
                                suggestedMin: 0,
                                suggestedMax: 10,
                                ticks: {
                                    backdropColor: 'rgba(255, 255, 255, 0.75)',
                                    stepSize: 2
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                            }
                        }
                    }
                });
                chartRef.current = newChart;
            }
        }

        // Cleanup function to destroy chart on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="chart-container">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default SynthesisChart;