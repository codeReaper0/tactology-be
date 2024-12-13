"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpOptions = void 0;
const qs = require("qs");
exports.httpOptions = {
    querystringParser: (str) => qs.parse(str),
};
//# sourceMappingURL=httpAdapter.js.map