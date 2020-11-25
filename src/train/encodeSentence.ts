import { ICoa } from '../interfaces';
import { EConstants } from '../interfaces/index';
import { oneHotEncode } from './oneHotEncode';

export const encodeSentence = (
    text: string,
    wordToIndex: ICoa,
    maxSentenceLength: number
): number[][] => {
    const matrix: number[][] = [];
    const wordArray = text.split(' ').filter(Boolean);
    for (let i = 0; i < maxSentenceLength; i++) {
        const word = wordArray[i] || EConstants.EMPTY;
        const label = typeof wordToIndex[word] !== 'undefined' ? word : EConstants.UNK;
        matrix.push(oneHotEncode(label, wordToIndex));
    }
    return matrix;
};
