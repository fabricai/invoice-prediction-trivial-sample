import path from 'node:path';
import fs from 'node:fs'

import { encodeSentence } from '../../../train/encodeSentence';

console.log(
    encodeSentence(
        'Ostot Sosiaaliturvamaksut',
        JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../data/wordToIndex.json'), 'utf-8')),
        5
    )
);
