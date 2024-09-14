import { Request, Response } from "express"
import ElevenLabsService from "../services/eleven-labs.service"
import zod from "../utils/zod";
import { v4 as uuidv4 } from 'uuid';
import GeminiAiService from "../services/gemini-ai.service";
import FileSystemService from "../services/file-system.service";
import storage from "../utils/storage";
import ffmPeg from "../utils/ffm-peg";
import rhubarb from "../utils/rhubarb";

class ChatController {
    public async getVoices(req: Request, res: Response) {
        try {
            const voices = await (new ElevenLabsService()).getVoices();
            return res.json(voices);
        } catch (error: any) {
            return res.json({ error: error.message ?? "" })
        }
    }

    public async replyChat(req: Request, res: Response) {
        const { input, errors } = zod.validate((z) => z.object({
            message: z.string().max(200),
        }), req.body)

        if (errors.length) return res.status(400).json({ errors: errors });

        try {
            let outputMessages = await (new GeminiAiService()).getOutput(input.message);

            const folderPath = storage.path(`audios/${uuidv4()}`);
            await (new FileSystemService()).createFolder(folderPath);

            for (let i = 0; i < outputMessages.length; i++) {
                const message = outputMessages[i];

                const mp3FilePath = `${folderPath}/message_${i}.mp3`;
                const wavFilePath = `${folderPath}/message_${i}.wav`;
                const jsonFilePath = `${folderPath}/message_${i}.json`;

                await (new ElevenLabsService()).convertTextToSpeech(message.text, mp3FilePath);
                await ffmPeg.convertMp3ToWav(mp3FilePath, wavFilePath);
                await rhubarb.generateLipSyncFromWav(wavFilePath, jsonFilePath);

                console.log("hello")

                message.audio = await (new FileSystemService()).audioFileToBase64(mp3FilePath);
                message.lipsync = await (new FileSystemService()).readJsonTranscript(jsonFilePath);
            }

            return res.send(outputMessages);
        } catch (error: any) {
            return res.json({ error: error.message ?? "" })
        }
    }
}

export default new ChatController