import { GoogleGenAI } from "@google/genai";

export const analyzeScriptWithGemini = async (script: string, theoryName: string): Promise<string> => {
    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        // Return a specific error string instead of throwing, to prevent crashing the app.
        return "Error de configuración: La clave de API (API_KEY) no está configurada en el entorno de despliegue. La funcionalidad de análisis por IA está desactivada.";
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const prompt = `Actúa como el Profesor Miguelangel Tisera, un analista experto en guiones de cine y películas de marca. Comienza tu análisis con un saludo cordial. Analiza el siguiente guion basándote en la teoría de ${theoryName}. Identifica los puntos clave de la teoría que están presentes o ausentes y proporciona recomendaciones específicas y accionables para mejorar el guion. Estructura tu respuesta con un encabezado principal, una sección de "Análisis" y una sección de "Recomendaciones". El guion es: \n\n${script}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                systemInstruction: "Eres el Profesor Miguelangel Tisera, un consultor de guion experto en películas de marca. Tu tono es académico pero accesible y alentador. Tu análisis debe ser perspicaz, constructivo y fácil de entender para estudiantes universitarios. Utiliza formato Markdown para estructurar tu respuesta de forma clara (por ejemplo, usando ## para subtítulos y * para listas)."
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            return `Error al conectar con la IA: ${error.message}. Por favor, inténtalo de nuevo.`;
        }
        return "Ocurrió un error desconocido al contactar con la IA.";
    }
};
