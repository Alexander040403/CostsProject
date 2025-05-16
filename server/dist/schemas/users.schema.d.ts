import mongoose, { Document } from 'mongoose';
export type UsersDocument = User & Document;
export declare class User {
    username: string;
    password: string;
    _id: mongoose.Types.ObjectId | string;
}
export declare const UsersSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User, any> & User & Required<{
    _id: string | mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>, {}> & mongoose.FlatRecord<User> & Required<{
    _id: string | mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export type UserDocument = User & Document;
