"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LogInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const operators_1 = require("rxjs/operators");
const app_environment_1 = require("../../app.environment");
let LogInterceptor = LogInterceptor_1 = class LogInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LogInterceptor_1.name);
    }
    intercept(context, next) {
        const gqlContext = graphql_1.GqlExecutionContext.create(context);
        const { req } = gqlContext.getContext();
        if (req.url === '/graphql' && req.method === 'GET') {
            return next.handle();
        }
        const now = Date.now();
        this.logger.log(this.buildRequestLog(gqlContext));
        return next.handle().pipe((0, operators_1.tap)({
            next: () => this.logger.log(this.buildResponseLog(gqlContext, now)),
            error: (error) => this.logger.error(this.buildErrorLog(gqlContext, now, error)),
        }));
    }
    buildRequestLog(gqlContext) {
        const { req } = gqlContext.getContext();
        const { operationName, variables, query } = req.body;
        const logDetails = {
            msg: 'Incoming GraphQL Request',
            operationName,
            resolverName: gqlContext.getHandler().name,
            class: gqlContext.getClass().name,
            request: {
                ...(app_environment_1.ENV.NODE_ENV === app_environment_1.Environment.LOCAL && {
                    variables,
                    query: query ? this.truncateQuery(query) : undefined,
                }),
            },
        };
        return logDetails;
    }
    buildResponseLog(gqlContext, before) {
        return {
            msg: 'Outgoing GraphQL Response',
            operationName: gqlContext.getArgs()[1]?.operationName,
            resolverName: gqlContext.getHandler().name,
            class: gqlContext.getClass().name,
            executionTime: `${Date.now() - before}ms`,
        };
    }
    buildErrorLog(gqlContext, before, error) {
        return {
            msg: 'GraphQL Error',
            operationName: gqlContext.getArgs()[1]?.operationName,
            resolverName: gqlContext.getHandler().name,
            class: gqlContext.getClass().name,
            executionTime: `${Date.now() - before}ms`,
            error: {
                message: error.message,
                stack: error.stack,
            },
        };
    }
    truncateQuery(query, maxLength = 500) {
        return query.length > maxLength
            ? query.substring(0, maxLength) + '...'
            : query;
    }
    sanitizeResponse(data, maxDepth = 2) {
        if (maxDepth === 0 || data === null || data === undefined)
            return null;
        if (Array.isArray(data)) {
            return data
                .map((item) => this.sanitizeResponse(item, maxDepth - 1))
                .slice(0, 5);
        }
        if (typeof data === 'object') {
            const sanitizedObj = {};
            for (const [key, value] of Object.entries(data)) {
                sanitizedObj[key] = this.sanitizeResponse(value, maxDepth - 1);
            }
            return sanitizedObj;
        }
        return data;
    }
};
exports.LogInterceptor = LogInterceptor;
exports.LogInterceptor = LogInterceptor = LogInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LogInterceptor);
//# sourceMappingURL=log.interceptor.js.map