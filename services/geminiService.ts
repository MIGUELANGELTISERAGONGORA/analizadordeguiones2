import { GoogleGenAI } from "@google/genai";

export const analyzeScriptWithGemini = async (script: string, theoryName: string, apiKey: string): Promise<string> => {
    if (!apiKey) {
        return "Error: La clave de API no ha sido proporcionada. Por favor, introduce tu clave para usar el analizador.";
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Por favor, comienza con un saludo cordial. Luego, analiza el siguiente guion basándote en la teoría de ${theoryName}. Estructura tu respuesta con los subtítulos 'Análisis' y 'Recomendaciones'. El guion es:\n\n${script}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                systemInstruction: "Eres el Profesor Miguelangel Tisera, un consultor de guion experto en películas de marca. Tu tono es académico pero accesible y alentador. Tu análisis debe ser perspicaz, constructivo y fácil de entender para estudiantes universitarios. Utiliza formato HTML para estructurar tu respuesta: usa `<h3>` para los subtítulos 'Análisis' y 'Recomendaciones', y `<ul>` con `<li>` para las listas con viñetas."
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            // Check for common API key errors
            if (error.message.includes('API key not valid')) {
                return "Error: La clave de API proporcionada no es válida. Por favor, verifica e introdúcela de nuevo.";
            }
            return `Error al conectar con la IA: ${error.message}. Por favor, inténtalo de nuevo.`;
        }
        return "Ocurrió un error desconocido al contactar con la IA.";
    }
};