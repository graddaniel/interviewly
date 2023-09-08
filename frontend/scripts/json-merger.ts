import JsonMerger from 'json-merger';
import {
    readdir,
    readFile,
    writeFile,
} from 'fs/promises'

const jsonMerger = new JsonMerger({});

(async function() {
    const fileNames = await readdir('./jsons');
    for (const fileName of fileNames) {
        const result = jsonMerger.mergeFiles(['./english-base.json', `./jsons/${fileName}`]);

        const [ actualFileName ] = fileName.split('_');
    
        await writeFile(`./merged/${actualFileName}.json`, JSON.stringify(result));
    }
})();