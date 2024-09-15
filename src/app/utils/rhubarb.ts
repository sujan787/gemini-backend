import path from 'path';
import os from 'os';
import { exec } from 'child_process';

const generateLipSyncFromWav = async (wavFilePath: string, jsonFilePath: string) => {
    const startTime = new Date().getTime();
    const basePath = path.join(__dirname, "../../../bin");

    try {
        if (os.platform() === 'linux') {
            await execCommand(
                `${basePath}/rhubarb-l/rhubarb -f json -o ${jsonFilePath} ${wavFilePath} -r phonetic`
            );
        } else if (os.platform() === 'win32') {
            await execCommand(
                `cd ${basePath}/rhubarb-w && rhubarb.exe -f json -o ${jsonFilePath} ${wavFilePath} -r phonetic`
            );
        } else {
            throw new Error(`Unsupported platform: ${os.platform()}`);
        }

        const endTime = new Date().getTime();
        console.log(`Lip sync done in ${endTime - startTime}ms`);
    } catch (error) {
        console.error('Error generating lip sync:', error);
    }
};

const execCommand = (command: string) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing command:', error.message);
                console.error('stderr:', stderr);
                return reject(error);
            }
            resolve(stdout);
        });
    });
};

const rhubarb = {
    generateLipSyncFromWav,
};

export default rhubarb;
