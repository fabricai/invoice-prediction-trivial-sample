import { readFileSync } from 'jsonfile';
import path from 'path';
import { oneHotEncode } from '../../../train/oneHotEncode';
console.log(
    oneHotEncode('4000', readFileSync(path.join(__dirname, '../../../../data/labelToIndex.json')))
);
console.log(
    oneHotEncode('6300', readFileSync(path.join(__dirname, '../../../../data/labelToIndex.json')))
);
