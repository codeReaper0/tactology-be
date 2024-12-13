"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoModule = void 0;
const nestjs_pino_1 = require("nestjs-pino");
const app_environment_1 = require("../app.environment");
const prettyPrint = {
    sync: true,
    levelFirst: true,
    translateTime: 'mmm dd, HH:MM:ss',
    customColors: Object.entries({
        trace: 'magentaBright',
        debug: 'whiteBright',
        info: 'greenBright',
        warn: 'yellowBright',
        error: 'redBright',
        fatal: 'red',
    })
        .map((e) => `${e[0]}:${e[1]}`)
        .join(','),
};
const prettyTransp = {
    target: 'pino-pretty',
    options: prettyPrint,
};
const formatters = {
    level(label) {
        return { level: label };
    },
};
exports.PinoModule = nestjs_pino_1.LoggerModule.forRoot({
    pinoHttp: {
        level: app_environment_1.ENV.NODE_ENV === app_environment_1.Environment.LOCAL ? 'trace' : 'info',
        autoLogging: false,
        transport: app_environment_1.ENV.NODE_ENV === app_environment_1.Environment.LOCAL ? prettyTransp : undefined,
        formatters,
        serializers: { req: () => undefined },
    },
});
//# sourceMappingURL=pino.module.js.map