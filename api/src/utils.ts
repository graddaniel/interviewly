import hashingAlgorithms from 'sha2';

const { SHA512t } = hashingAlgorithms;
// https://en.wikipedia.org/wiki/Secure_Hash_Algorithms
// SHA-512/256 seems reasonably safe
const MAX_RAND_VALUE = 1000000 // million
const t = 256;

export function hash(input: string) {
    return SHA512t(t, input).toString('hex');
} 

export function generateRandomInteger () {
    return Math.floor(Math.random() * MAX_RAND_VALUE);
}

export function getCVBucketKeyByEmail (email: string) {
    return `cv_${email.replaceAll('@', '_').replaceAll('.', '_')}`;
}

export function getInterviewRecordingsBucketKeyByEmail (email: string) {
    return `${email.replaceAll('@', '_').replaceAll('.', '_')}.webm`;
}
