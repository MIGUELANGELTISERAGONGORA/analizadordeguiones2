import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeScriptWithGemini = async (script: string, theoryName: string): Promise<string> => {
    const prompt = `Actúa como el Profesor Miguelangel Tisera, un analista experto en guiones de cine y películas de marca. Comienza tu análisis con un saludo cordial. Analiza el siguiente guion basándote en la teoría de ${theoryName}. Identifica los puntos clave de la teoría que están presentes o ausentes y proporciona recomendaciones específicas y accionables para mejorar el guion. Estructura tu respuesta con un encabezado principal, una sección de "Análisis" y una sección de "Recomendaciones". El guion es: \n\n${script}`;

    try {
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