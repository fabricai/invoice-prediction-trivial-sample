import { readFileSync } from 'node:fs';
import path from 'node:path';

import { oneHotEncode } from '../../../train/oneHotEncode';

console.log(
    oneHotEncode(
        '4000',
        JSON.parse(readFileSync(path.join(__dirname, '../../../../data/labelToIndex.json'), 'utf8'))
    )
);
console.log(
    oneHotEncode(
        '6300',
        JSON.parse(readFileSync(path.join(__dirname, '../../../../data/labelToIndex.json'), 'utf8'))
    )
);
