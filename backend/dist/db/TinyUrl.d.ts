/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
export declare const TinyUrl: import("mongoose").Model<import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    domain: string;
    tinyUrlId: string;
    actualUrl: string;
} & {}, {}, {}> & {
    [name: string]: Function;
};
