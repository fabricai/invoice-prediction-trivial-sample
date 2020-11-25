import minimist from 'minimist';
const { epochs = 10 } = minimist(process.argv.slice(2));

import * as tf from '@tensorflow/tfjs-node-gpu';
import path from 'path';
import jsonfile from 'jsonfile';
import { oneHotEncode } from './oneHotEncode';
import { encodeSentence } from './encodeSentence';
import { ICoa } from '../interfaces';

const MAX_SENTENCE_LENGTH = 2;
/**
 * This will define mode, setup the dataset(s) and train model
 */
export const train = async (): Promise<tf.History> => {
    const dataRoot = path.join(__dirname, '../../data');
    const wordToIndex = jsonfile.readFileSync(path.join(dataRoot, 'wordToIndex.json')) as ICoa;
    const labelToIndex = jsonfile.readFileSync(path.join(dataRoot, 'labelToIndex.json')) as ICoa;

    /**
     * Generate the train and test tensors
     */
    const train = tf.data
        .csv('file://' + path.join(dataRoot, '/train.csv'), {
            hasHeader: false,
            columnNames: ['label', 'text'],
            delimiter: ',',
        })
        // @ts-expect-error
        .map(({ label, text }) => {
            // @ts-expect-error
            const xs = [[].concat(...encodeSentence(text, wordToIndex, MAX_SENTENCE_LENGTH))];
            return {
                xs,
                ys: [oneHotEncode(label, labelToIndex)],
            };
        })
        .batch(32);
    const test = tf.data
        .csv('file://' + path.join(dataRoot, '/validation.csv'), {
            hasHeader: false,
            columnNames: ['label', 'text'],
            delimiter: ',',
        })
        // @ts-expect-error
        .map(({ label, text }) => {
            // @ts-expect-error
            const xs = [[].concat(...encodeSentence(text, wordToIndex, MAX_SENTENCE_LENGTH))];
            return {
                xs,
                ys: [oneHotEncode(label, labelToIndex)],
            };
        })
        .batch(32);

    /**
     * Define the used model
     * The inputShape is maxLength x oneHotLength
     */
    const model = tf.sequential();
    model.add(
        tf.layers.dense({
            units: 20,
            inputShape: [MAX_SENTENCE_LENGTH * Object.keys(wordToIndex).length],
        })
    );
    model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: Object.keys(labelToIndex).length, activation: 'softmax' }));
    model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: 'adam',
        metrics: ['accuracy'],
    });
    model.summary();
    const history = await model.fitDataset(train, {
        epochs,
        validationData: test,
    });
    return history;
};
