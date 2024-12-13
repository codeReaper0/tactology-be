import { LoggerModule } from 'nestjs-pino';

import { ENV, Environment } from '@/app.environment';

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
  level(label: string) {
    return { level: label };
  },
};

/**
 * Module used to create a Pino logger instance
 * https://github.com/iamolegga/nestjs-pino
 *
 * @returns {DynamicModule} Nest Application DynamicModule
 */
export const PinoModule = LoggerModule.forRoot({
  pinoHttp: {
    level: ENV.NODE_ENV === Environment.LOCAL ? 'trace' : 'info',
    autoLogging: false,
    transport: ENV.NODE_ENV === Environment.LOCAL ? prettyTransp : undefined,
    formatters,
    serializers: { req: () => undefined },
  },
});
