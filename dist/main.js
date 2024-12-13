"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("@fastify/cors");
const helmet_1 = require("@fastify/helmet");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
const httpAdapter_1 = require("./config/httpAdapter");
const app_environment_1 = require("./app.environment");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(httpAdapter_1.httpOptions), {
        bufferLogs: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.flushLogs();
    await app.register(helmet_1.default, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", 'https://cdn.jsdelivr.net'],
                scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
            },
        },
    });
    await app.register(cors_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
    }));
    if (app_environment_1.ENV.NODE_ENV === app_environment_1.Environment.PRODUCTION) {
        app.enableShutdownHooks();
    }
    await app.listen(app_environment_1.ENV.PORT, '0.0.0.0');
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map