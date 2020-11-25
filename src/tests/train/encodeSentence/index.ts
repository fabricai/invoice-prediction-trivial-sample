import { readFileSync } from 'jsonfile';
import path from 'path';
import { encodeSentence } from '../../../train/encodeSentence';
console.log(
    encodeSentence(
        'Ostot Sosiaaliturvamaksut',
        readFileSync(path.join(__dirname, '../../../../data/wordToIndex.json')),
        5
    )
);
