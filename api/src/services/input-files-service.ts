import { readFile, unlink } from 'node:fs/promises';
import xlsx from 'node-xlsx';
import config from 'config';


export default class InputFilesService {
    uploadDirectory: string;

    constructor () {
        this.uploadDirectory = config.get('fileUpload.directory');
    }

    private _readXLSXFile = async (fileDirectory: string) => {
        const fileBuffer = await readFile(fileDirectory);

        const worksheet = xlsx.parse(fileBuffer);

        return worksheet[0].data.slice(1);

    }

    processRespondentsFile = async (filename: string) => {
        const respondentsFileDirectory = process.cwd() + `${this.uploadDirectory}/${filename}`;
        const respondents = await this._readXLSXFile(respondentsFileDirectory);

        await unlink(respondentsFileDirectory);

        return respondents.map(r => ({
            email: r[0],
            language: r[1],
        }));
    }
}