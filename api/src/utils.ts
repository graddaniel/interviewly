import hashingAlgorithms from 'sha2';


const { SHA512t } = hashingAlgorithms;
// https://en.wikipedia.org/wiki/Secure_Hash_Algorithms
// SHA-512/256 seems reasonably safe
const t = 256;

export function hash(input: string) {
    return SHA512t(t, input).toString('hex');
} 