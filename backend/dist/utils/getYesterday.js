"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYesterday = void 0;
function getYesterday() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}
exports.getYesterday = getYesterday;
//# sourceMappingURL=getYesterday.js.map