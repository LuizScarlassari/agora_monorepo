import { GoogleGenAI } from "@google/genai";

/**
 * Fetches the number of votes for a federal deputy candidate in the 2022 election using the Gemini API.
 * @param name The full name of the candidate.
 * @param state The two-letter state abbreviation (e.g., 'SP').
 * @param apiKey The user-provided Gemini API key.
 * @returns A promise that resolves to the number of votes, or 0 if not found or on error.
 */
export const getVotesForCandidate = async (name: string, state: string, apiKey: string): Promise<number> => {
    if (!apiKey) {
        console.error("Cannot call Gemini API because API_KEY is missing.");
        return 0;
    }
    
    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Qual foi o número exato de votos que o candidato a deputado federal ${name} recebeu no estado de ${state} nas eleições de 2022? Responda APENAS com o número inteiro, sem pontos ou vírgulas. Se não encontrar um valor exato e confiável, responda com 0.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
             config: {
                // Ensure a numeric-like response
                temperature: 0,
            }
        });

        const text = response.text.trim();
        // Remove any formatting like dots or commas that might be used as thousands separators
        const cleanedText = text.replace(/[.,]/g, '');
        const votes = parseInt(cleanedText, 10);

        if (isNaN(votes)) {
            console.warn(`Gemini returned a non-numeric response for ${name}: "${text}"`);
            return 0;
        }

        return votes;
    } catch (error) {
        console.error(`Failed to get election votes for ${name} from Gemini API:`, error);
        return 0; // Return 0 on failure
    }
};