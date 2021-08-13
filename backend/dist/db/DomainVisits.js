"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainVisits = void 0;
const ts_mongoose_1 = require("ts-mongoose");
const DomainVisitsSchema = ts_mongoose_1.createSchema({
    domain: ts_mongoose_1.Type.string({ required: true }),
    visitedAt: ts_mongoose_1.Type.date({ required: true })
});
exports.DomainVisits = ts_mongoose_1.typedModel('DomainVisits', DomainVisitsSchema);
//# sourceMappingURL=DomainVisits.js.map