export interface ISample {
    label: string;
    text: string;
}

export interface ICoa {
    [accountNumber: string]: string;
}
export interface ICountInstances {
    [thingToCount: string]: number;
}

export enum EConstants {
    'UNK' = 'UNK',
    'EMPTY' = 'EMPTY',
}
