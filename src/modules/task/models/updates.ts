import * as mongoose from 'mongoose';
export interface Updates {

    date: { type: string, empty: false, required: true, index: { unique: true } };
    description: { type: string, empty: true, required: false, default: 'no description for this Update ' };

}