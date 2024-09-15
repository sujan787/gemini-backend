import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream } from "fs";
import elevenLabsConfig from "../configs/eleven-labs.config";

const elevenLabs = new ElevenLabsClient({
    apiKey: elevenLabsConfig.api_key
})

class ElevenLabsService {
    public async getVoices() {
        return await elevenLabs.voices.getAll();
    }

    public async convertTextToSpeech(text: string, mp3filePath: string) {
        
        return new Promise<string>(async (resolve, reject) => {
            try {
                const audio = await elevenLabs.generate({
                    voice: "Rachel",
                    model_id: "eleven_turbo_v2",
                    text,
                });
                const fileName = mp3filePath;
                const fileStream = createWriteStream(fileName);

                audio.pipe(fileStream);
                fileStream.on("finish", () => resolve(fileName));
                fileStream.on("error", reject);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default ElevenLabsService