import minimist from 'minimist';

import { generateTrainValidationData } from './generateTrainValidationData/index';
import { train } from './train/index';

const { noise, epochs } = minimist(process.argv.slice(2));

/**
 *
 */
const run = async (): Promise<void> => {
    if (noise) {
        const noiseAsNumber = +noise;
        if (!(noiseAsNumber >= 0 && noiseAsNumber <= 1)) {
            console.log(
                `Please, if you want to define --noise=${noise} .. it needs to be between 0 and 1`
            );
            return;
        }
    }
    if (epochs) {
        const epochAsNumber = +epochs;
        if (!(epochAsNumber > 0 && epochAsNumber < 100)) {
            console.log(
                `Please, if you want to define --epochs=${epochs} .. it needs to be between 0 and 100`
            );
            return;
        }
    }
    console.log(
        [
            ``,
            `******* INFO *******`,
            ``,
            `This repo is meant to demonstrate that`,
            `developing an AI or any kind of ML model`,
            `in itself is trivial and should not be`,
            `used as a criteria for selecting any`,
            `solution.`,
            ``,
            ` For example just specifying that "we`,
            `are looking an AI to process purcase`,
            `invoice (or predict x, y or z) will`,
            `lead to results that are not desired`,
            ``,
            `In this demo we will do end-to-end`,
            `training sample, where we will develop`,
            `Deep learning AI to predict accounts.`,
            ``,
            `In this demo we will use simple chart`,
            `of accounts (tilikartta) to generate`,
            `training and validation sets. However,`,
            `using this repo, you could easily swap`,
            `the data and end up training a "real life"`,
            `model.`,
            ``,
            `Next we will`,
            `\t-generate training and validation data`,
            `\t-train a model to predict accounts`,
            ``,
            `Customization:`,
            `\t--noise=${noise || 0.9} (between 0...1 : control how much we add noise to data) `,
            `\t--epochs=${epochs || 10} how may epochs we will train the model`,
            ``,
            ``,
        ].join('\r\n')
    );

    console.log(`Start generating training and validation data`);
    await generateTrainValidationData();
    console.log(`\tOK - done`);
    console.log(`Start training the mode`);
    const history = await train();
    console.log(`\tOK - done`);
    // @ts-expect-error
    const bestAccuracy = Math.round(Math.max(...history.history.val_acc) * 1000) / 10;
    console.log(`Achieved accuracy of ${bestAccuracy} % with unseed validation data!`);
};
run();
