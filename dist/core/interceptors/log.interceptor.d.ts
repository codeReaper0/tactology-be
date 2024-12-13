import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
export declare class LogInterceptor implements NestInterceptor {
    private readonly logger;
    constructor();
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    buildRequestLog(gqlContext: GqlExecutionContext): {
        msg: string;
        operationName: any;
        resolverName: string;
        class: string;
        request: {
            variables: any;
            query: string;
        };
    };
    buildResponseLog(gqlContext: GqlExecutionContext, before: number): {
        msg: string;
        operationName: any;
        resolverName: string;
        class: string;
        executionTime: string;
    };
    buildErrorLog(gqlContext: GqlExecutionContext, before: number, error: Error): {
        msg: string;
        operationName: any;
        resolverName: string;
        class: string;
        executionTime: string;
        error: {
            message: string;
            stack: string;
        };
    };
    private truncateQuery;
    private sanitizeResponse;
}
