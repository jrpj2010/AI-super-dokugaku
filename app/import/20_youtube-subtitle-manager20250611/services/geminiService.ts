import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// API Key is expected to be in process.env.API_KEY
// Ensure this environment variable is set where the code is executed.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not found. Please set it.");
  // In a real app, you might want to throw an error or handle this more gracefully
  // For this example, we'll let it proceed, but API calls will fail.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion for API_KEY, assuming it's set
const modelName = 'gemini-2.5-flash-preview-04-17';

export const generateText = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject("APIキーが設定されていません。(API Key is not configured.)");
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      // config: { // Example config, omitting for default higher quality
      //   temperature: 0.7,
      // }
    });
    
    // Directly access the text property as per guidelines
    const text = response.text;
    
    if (text === null || text === undefined) {
        // This case should ideally not happen if the API call is successful and returns text.
        // It's a fallback for unexpected scenarios.
        console.warn("Gemini API returned a null or undefined text response.", response);
        return "AIからの応答が空でした。(The AI returned an empty response.)";
    }
    
    return text;

  } catch (error) {
    console.error("Gemini API request failed:", error);
    if (error instanceof Error) {
        // Check for common API key related errors (this is a guess, actual error messages might vary)
        if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
            return Promise.reject("Gemini APIキーが無効です。設定を確認してください。(Invalid Gemini API Key. Please check your configuration.)");
        }
        if (error.message.includes("quota")) {
            return Promise.reject("Gemini APIのクォータを超過しました。(Gemini API quota exceeded.)");
        }
         return Promise.reject(`Gemini APIエラー: ${error.message} (Gemini API Error)`);
    }
    return Promise.reject("Gemini APIリクエスト中に不明なエラーが発生しました。(An unknown error occurred during the Gemini API request.)");
  }
};
