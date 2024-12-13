import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LogInterceptor } from '@/core/interceptors/log.interceptor';
import { LoggerModule } from '@/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class CoreModule {}
