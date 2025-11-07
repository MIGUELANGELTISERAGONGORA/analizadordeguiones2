
import React from 'react';
import type { MasterKey } from '../types';
import SydFieldParadigm from './SydFieldParadigm';

interface TheoryContentProps {
    selectedMaster: MasterKey | null;
}

const TheoryContent: React.FC<TheoryContentProps> = ({ selectedMaster }) => {
    if (!selectedMaster) {
        return <div className="text-center text-gray-500 py-10">Selecciona una perspectiva teórica para ver los detalles.</div>;
    }

    return (
        <div>
            {selectedMaster === 'field' && (
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">El Paradigma de Syd Field: La Estructura en Tres Actos</h3>
                    <p className="mb-6 text-gray-600">Syd Field propuso una estructura universal que se encuentra en la mayoría de las historias exitosas. Su "Paradigma" divide el guion en tres actos definidos por puntos clave de la trama que hacen avanzar la historia y mantienen al público enganchado. Haz clic en cada punto para ver su función.</p>
                    <SydFieldParadigm />
                </div>
            )}
            {selectedMaster === 'mckee' && (
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Los Principios de Robert McKee: El Arte de la Historia</h3>
                    <p className="mb-6 text-gray-600">Para McKee, la historia es la sustancia, no solo la forma. Se enfoca en cómo los eventos crean un cambio significativo en la vida de un personaje a través del conflicto. Sus principios clave giran en torno al diseño de la trama, la creación de personajes profundos y la satisfacción del público.</p>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><h4 className="font-bold text-[#4A908A]">Incidente Incitador</h4><p className="text-sm text-gray-600">El evento que desequilibra la vida del protagonista y lanza la historia.</p></div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><h4 className="font-bold text-[#4A908A]">Brecha entre Expectativa y Resultado</h4><p className="text-sm text-gray-600">El núcleo del conflicto. Un personaje actúa esperando un resultado, pero obtiene otro, forzándolo a actuar de nuevo.</p></div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><h4 className="font-bold text-[#4A908A]">Crisis, Clímax y Resolución</h4><p className="text-sm text-gray-600">La decisión final del protagonista ante el dilema más difícil, la confrontación final y el nuevo equilibrio que resulta.</p></div>
                    </div>
                </div>
            )}
            {selectedMaster === 'sugarman' && (
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Los "Triggers" de Joseph Sugarman: Conectando Emocionalmente</h3>
                    <p className="mb-6 text-gray-600">Aunque es un maestro del copywriting, los "disparadores psicológicos" de Sugarman son esenciales para entender por qué las Brand Movies conectan tan profundamente. No venden un producto, venden una emoción, una idea. La narrativa se convierte en el vehículo para activar estos disparadores en el público.</p>
                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><h4 className="font-bold text-[#4A908A]">Contar una Historia</h4><p className="text-sm text-gray-600">El cerebro humano está programado para las historias. Crean una conexión inmediata y hacen que el mensaje sea memorable.</p></div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><h4 className="font-bold text-[#4A908A]">Establecer Autoridad</h4><p className="text-sm text-gray-600">La historia debe posicionar a la marca o al protagonista como un experto o una figura de confianza.</p></div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><h4 className="font-bold text-[#4A908A]">Apelar a la Emoción</h4><p className="text-sm text-gray-600">La gente compra (y conecta) con la emoción, y lo justifica con la lógica. La historia debe evocar sentimientos fuertes.</p></div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><h4 className="font-bold text-[#4A908A]">Justificar la Conexión</h4><p className="text-sm text-gray-600">Aunque la conexión es emocional, la historia proporciona razones lógicas para que el público se sienta bien con esa conexión.</p></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TheoryContent;
