import { exec } from "child_process";

const convertMp3ToWav = async (mp3FilePath: string, wavFilePath: string) => {
    await execCommand(
        `ffmpeg -y -i ${mp3FilePath} ${wavFilePath}`
    );
}

const execCommand = (command: string) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) reject(error);
            resolve(stdout);
        });
    });
};

const ffmPeg = {
    convertMp3ToWav
}

export default ffmPeg;