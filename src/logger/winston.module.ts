import { utilities, WinstonModule as LoggerModule } from 'nest-winston';
import * as winston from 'winston';

import { ENV } from '@/app.environment';

/**
 * Module used to create a Winton logger instance
 * https://github.com/gremo/nest-winston
 *
 * @returns {DynamicModule} Nest Application DynamicModule
 */
export const WinstonModule = LoggerModule.forRoot({
  defaultMeta: {
    env: ENV.NODE_ENV,
    version: ENV.VERSION,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(utilities.format.nestLike()),
    }),
  ],
});
