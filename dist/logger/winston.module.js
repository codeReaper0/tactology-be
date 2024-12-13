"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonModule = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const app_environment_1 = require("../app.environment");
exports.WinstonModule = nest_winston_1.WinstonModule.forRoot({
    defaultMeta: {
        env: app_environment_1.ENV.NODE_ENV,
        version: app_environment_1.ENV.VERSION,
    },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(nest_winston_1.utilities.format.nestLike()),
        }),
    ],
});
//# sourceMappingURL=winston.module.js.map