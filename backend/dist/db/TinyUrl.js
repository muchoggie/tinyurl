"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyUrl = void 0;
const ts_mongoose_1 = require("ts-mongoose");
const TinyUrlSchema = ts_mongoose_1.createSchema({
    tinyUrlId: ts_mongoose_1.Type.string({ required: true }),
    actualUrl: ts_mongoose_1.Type.string({ required: true }),
    domain: ts_mongoose_1.Type.string({ required: true })
});
exports.TinyUrl = ts_mongoose_1.typedModel('TinyUrl', TinyUrlSchema);
//# sourceMappingURL=TinyUrl.js.map