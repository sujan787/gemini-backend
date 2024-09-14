import filePath from 'path';

const path = (subPath: string) => {
    return filePath.join(__dirname, "../../../storage/app", subPath);
}

const storage = { path }
export default storage