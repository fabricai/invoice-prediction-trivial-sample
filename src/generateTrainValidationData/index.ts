import fs from 'node:fs';
import path from 'node:path';

import minimist from 'minimist';

import { EConstants, ICoa, ICountInstances, ISample } from '../interfaces';
import { coa } from './coa';

const { noise = 0.9 } = minimist(process.argv.slice(2));

const SIZE_OF_TRAIN_DATA = 500;
const SIZE_OF_VALIDATION_DATA = 200;

const getRandomIndex = (max: number, min = 0): number => {
    return Math.floor(Math.random() * max) + min;
};
/**
 * Generate samples (with some noise)
 */
const generateSample = (dictionary: ICoa): ISample => {
    const labels = Object.keys(dictionary);
    const random = getRandomIndex(labels.length);
    const label = labels[random];
    if (Math.random() < +noise) {
        return {
            label,
            text: dictionary[label],
        };
    }

    const randomText = Object.values(dictionary)[getRandomIndex(labels.length)];
    return {
        label,
        text: randomText,
    };
};

/**
 * Use this function to generate a train and validation data for training
 * We will use a simple chart of accounts to generate the "data"
 *
 * But this you could easily swap the "text" part with real purchase
 * invoice data
 *
 * Save the train and validation data to /data folder
 * Also generate necessary dictionaries that will be used to train
 * model
 */
export const generateTrainValidationData = async (): Promise<void> => {
    const trainData: ISample[] = [];
    const validationData: ISample[] = [];
    const labelToIndex: ICoa = {};
    const indexToLabel: ICoa = {};
    const countWords: ICountInstances = {};
    let index = 0;
    for (let label in coa) {
        labelToIndex[label] = String(index);
        indexToLabel[index] = label;
        index++;
    }
    for (let i = 0; i < SIZE_OF_TRAIN_DATA; i++) {
        trainData.push(generateSample(coa));
    }
    for (let i = 0; i < SIZE_OF_VALIDATION_DATA; i++) {
        validationData.push(generateSample(coa));
    }

    for (const { text } of trainData) {
        for (const word of text.split(' ').filter(Boolean)) {
            countWords[word] = countWords[word] ? countWords[word] : 0;
            countWords[word]++;
        }
    }

    /**
     * Use EMPTY for padding and UNK for out-of-dictionary words
     */
    const wordToIndex: ICoa = {};
    wordToIndex[EConstants.EMPTY] = '0';
    wordToIndex[EConstants.UNK] = '1';
    index = Math.max(...Object.values(wordToIndex).map((o) => +o)) + 1;
    for (let word in countWords) {
        wordToIndex[word] = String(index);
        index++;
    }

    const folderToSave = path.join(__dirname, '../../data');
    if (!fs.existsSync(folderToSave)) {
        fs.mkdirSync(folderToSave);
    }
    fs.writeFileSync(
        path.join(folderToSave, '/train.csv'),
        trainData.map((o) => Object.values(o).join(',')).join('\r\n') + '\r\n'
    );
    fs.writeFileSync(
        path.join(folderToSave, '/validation.csv'),
        validationData.map((o) => Object.values(o).join(',')).join('\r\n') + '\r\n'
    );
    fs.writeFileSync(path.join(folderToSave, '/labelToIndex.json'), JSON.stringify(labelToIndex));
    fs.writeFileSync(path.join(folderToSave, '/indexToLabel.json'), JSON.stringify(indexToLabel));
    fs.writeFileSync(path.join(folderToSave, '/wordToIndex.json'), JSON.stringify(wordToIndex));
};
