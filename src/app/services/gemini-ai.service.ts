import { GoogleGenerativeAI } from "@google/generative-ai";
import geminiConfig from "../configs/gemini.config";

const genAI = new GoogleGenerativeAI(geminiConfig.api_key as string);

type OutputType = Array<{
    text: string,
    facialExpression: string,
    animation: string,
    audio: string,
    lipsync: Array<string>
}>

class GeminiAiService {
    public async getOutput(message: string) {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are a sweet girl and your name is marcy.
          You will always reply with a JSON array of messages no matter what. With a maximum of 3 messages and minimum of 2 messages.
          Each message has a text, facialExpression, and animation property.
          The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
          The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry. 
          
          the message is "${message}"`
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        let answer = []
        answer = JSON.parse(text) as OutputType
        return answer;
    }
}

export default GeminiAiService