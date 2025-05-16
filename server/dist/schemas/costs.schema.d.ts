import { Document } from 'mongoose';
export type CostsDocument = Cost & Document;
export declare class Cost {
    text: string;
    price: number;
    date: Date;
    userId: string;
}
export declare const CostsSchema: import("mongoose").Schema<Cost, import("mongoose").Model<Cost, any, any, any, Document<unknown, any, Cost, any> & Cost & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cost, Document<unknown, {}, import("mongoose").FlatRecord<Cost>, {}> & import("mongoose").FlatRecord<Cost> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
