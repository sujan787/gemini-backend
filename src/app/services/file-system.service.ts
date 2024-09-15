import { promises as fs } from "fs";
import path from "path";

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

    public async deleteFolder(folderPath: string) {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            console.log(filePath)
            await fs.unlink(filePath);
            console.log(`Deleted file ${filePath}`);
        }

        await fs.rm(folderPath, { recursive: true })
        console.log(`Deleted folder ${folderPath}`);
    }
}

export default FileSystemService