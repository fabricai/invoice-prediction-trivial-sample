import { ICoa } from '../interfaces';

const generateEmptyArray = (arrayLength: number): number[] => {
    return new Array(arrayLength).fill(0).map((n) => 0);
};

export const oneHotEncode = (label: string, labelToIndex: ICoa): number[] => {
    const vector = generateEmptyArray(Object.keys(labelToIndex).length);
    const index = labelToIndex[label];
    if (typeof index !== 'undefined') {
        vector[+index] = 1;
    }
    return vector;
};
