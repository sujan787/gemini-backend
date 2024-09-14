import { promises as fs } from "fs";

class FileSystemService {

    public async audioFileToBase64(filePath: string) {
        const data = await fs.readFile(filePath);
        return data.toString("base64");
    }

    public async readJsonTranscript(filePath: string) {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    }

    public async createFolder(folderPath: string) {
        await fs.mkdir(folderPath, { recursive: true });
    }
}

export default FileSystemService