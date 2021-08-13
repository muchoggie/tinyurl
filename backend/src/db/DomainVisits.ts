import { createSchema, Type, typedModel } from 'ts-mongoose';

const DomainVisitsSchema = createSchema(
    {
        domain: Type.string({ required: true }),
        visitedAt: Type.date({ required: true })
    }
);

export const DomainVisits = typedModel('DomainVisits', DomainVisitsSchema);