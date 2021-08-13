"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const router_1 = tslib_1.__importDefault(require("./router"));
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const app = express_1.default();
const port = 8000;
mongoose_1.default.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connection is open');
});
const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Accept']
};
app.use(cors_1.default(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/', router_1.default);
app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map