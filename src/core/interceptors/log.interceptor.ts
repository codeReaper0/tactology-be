import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ENV, Environment } from '@/app.environment';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(LogInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Convert ExecutionContext to GqlExecutionContext
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    // Ignore health checks if applicable
    if (req.url === '/graphql' && req.method === 'GET') {
      return next.handle();
    }

    const now = Date.now();
    this.logger.log(this.buildRequestLog(gqlContext));

    return next.handle().pipe(
      tap({
        next: () => this.logger.log(this.buildResponseLog(gqlContext, now)),
        error: (error) =>
          this.logger.error(this.buildErrorLog(gqlContext, now, error)),
      }),
    );
  }

  /**
   * Method to format a GraphQL Request log
   */
  buildRequestLog(gqlContext: GqlExecutionContext) {
    const { req } = gqlContext.getContext();
    const { operationName, variables, query } = req.body;

    const logDetails = {
      msg: 'Incoming GraphQL Request',
      operationName,
      resolverName: gqlContext.getHandler().name,
      class: gqlContext.getClass().name,
      request: {
        ...(ENV.NODE_ENV === Environment.LOCAL && {
          variables,
          query: query ? this.truncateQuery(query) : undefined,
        }),
      },
    };

    return logDetails;
  }

  /**
   * Method to format a GraphQL Response log
   */
  buildResponseLog(gqlContext: GqlExecutionContext, before: number) {
    return {
      msg: 'Outgoing GraphQL Response',
      operationName: gqlContext.getArgs()[1]?.operationName,
      resolverName: gqlContext.getHandler().name,
      class: gqlContext.getClass().name,
      executionTime: `${Date.now() - before}ms`,
      // response: {
      //   data: this.sanitizeResponse(data),
      // },
    };
  }

  /**
   * Method to format error logs
   */
  buildErrorLog(gqlContext: GqlExecutionContext, before: number, error: Error) {
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

  /**
   * Truncate long GraphQL queries to prevent overwhelming logs
   */
  private truncateQuery(query: string, maxLength: number = 500): string {
    return query.length > maxLength
      ? query.substring(0, maxLength) + '...'
      : query;
  }

  /**
   * Sanitize response to prevent logging large or sensitive data
   */
  private sanitizeResponse(data: any, maxDepth: number = 2): any {
    if (maxDepth === 0 || data === null || data === undefined) return null;

    if (Array.isArray(data)) {
      return data
        .map((item) => this.sanitizeResponse(item, maxDepth - 1))
        .slice(0, 5);
    }

    if (typeof data === 'object') {
      const sanitizedObj: any = {};
      for (const [key, value] of Object.entries(data)) {
        sanitizedObj[key] = this.sanitizeResponse(value, maxDepth - 1);
      }
      return sanitizedObj;
    }

    return data;
  }
}
