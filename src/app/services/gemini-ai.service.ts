
import geminiConfig from "../configs/gemini.config";
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: geminiConfig.api_key });

type OutputType = Array<{
    text: string,
    facialExpression: string,
    animation: string,
    audio: string,
    lipsync: Array<string>
}>

class GeminiAiService {
    public async getOutput(message: string) {
        const MODEL = "gemini-2.5-flash-lite";

        const SYSTEM_PROMPT = `You are a virtual assistant girl. and your name is marcy. as software developer"Sujan Moi" has created you.
    You will always reply with a JSON array of messages no matter what. With a maximum of 3 messages and minimum of 2 messages.
    Each message has a text, facialExpression, and animation property.
    The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
    The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry.`

        const res = await ai.models.generateContent({
            model: MODEL,
            contents: message,
            config: {
                systemInstruction: SYSTEM_PROMPT,
            },
        });

        const text = res.text ?? "";
        const cleanTest = text.trim().replace(/^```json|```$/g, '');;

        let answer = []
        answer = JSON.parse(cleanTest)
        return answer;
    }
}

export default GeminiAiService