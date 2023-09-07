export default async function promisesMap (
    map: { [k: string]: Promise<any> }
) {
    return new Promise(async (resolve, reject) => {
        const entries = Object.entries(map);

        const promisesEntries = entries.map(async mapEntry => {
            return [mapEntry[0], await mapEntry[1]];
        });

        try {
            const resolvedEntries = await Promise.all(promisesEntries);

            const resolvedMap = Object.fromEntries(resolvedEntries);

            return resolve(resolvedMap);
        } catch (error) {
            return reject(error);
        }
    });
}