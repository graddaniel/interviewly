import {
    readdir,
    readFile,
    writeFile,
} from 'fs/promises'
import xlsx from 'node-xlsx';

function XLSXtoJSON (xlsxBuffer) {
    const parsedXlsx = xlsx.parse(xlsxBuffer);

    const data = parsedXlsx[0].data;
    const dataRows = data.slice(1, data.length);

    const jsonResult = {};

    for (const row of dataRows) {
        addDataRowToJSON(row, jsonResult);
    }

    return jsonResult;
}

function addDataRowToJSON (row, jsonResult) {
    const [ key, value ] = row;

    const keyParts = key.split('/')
        .filter(k => k !== '')
        .map(k => isNaN(parseInt(k, 10)) ? k : parseInt(k, 10));

    let currentJsonSection = jsonResult;
    let previousJsonSection;
    let previousKey;
    for (let i = 0; i < keyParts.length; i += 1) { 
        if (!currentJsonSection[keyParts[i]]) {
            if (keyParts[i] < 100) {
                if (!Array.isArray(previousJsonSection[previousKey])) {
                    previousJsonSection[previousKey] = [];
                    currentJsonSection = previousJsonSection[previousKey];
                }
            } else {
                currentJsonSection[keyParts[i]] = {};
            }
        }

        if (i === keyParts.length - 1) {
            if (keyParts[i] < 100) {
                previousJsonSection[previousKey].push(value);
            } else {
                if (Array.isArray(currentJsonSection) && 
                currentJsonSection.length <= keyParts[i]) {
                    currentJsonSection.push({});
                }

                currentJsonSection[keyParts[i]] = value;
            }
        } else if (keyParts[i] < 100 && !currentJsonSection[keyParts[i]]) {
            currentJsonSection.push({});
        }

        previousJsonSection = currentJsonSection;
        previousKey = keyParts[i];
        currentJsonSection = currentJsonSection[keyParts[i]];
    } 
}

(async function() {
    const fileNames = await readdir('./translations');

    for (const fileName of fileNames) {
        const file = await readFile(`./translations/${fileName}`);

        const [ actualFileName, extension ] = fileName.split('.');

        const json = XLSXtoJSON(file);
    
        await writeFile(`./jsons/${actualFileName}.json`, JSON.stringify(json));
    }
})();