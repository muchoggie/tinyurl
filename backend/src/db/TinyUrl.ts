import { createSchema, Type, typedModel } from 'ts-mongoose';

const TinyUrlSchema = createSchema(
    {
        tinyUrlId: Type.string({ required: true }),
        actualUrl: Type.string({ required: true }),
        domain: Type.string({ required: true })
    }
);

export const TinyUrl = typedModel('TinyUrl', TinyUrlSchema);