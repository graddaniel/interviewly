const MAX_RAND_VALUE = 1000000 // million

export function generateRandomInteger () {
    return Math.floor(Math.random() * MAX_RAND_VALUE);
}