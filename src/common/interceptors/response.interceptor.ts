import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LogsService } from 'src/logs-mongo/logs.service';

 class ApiResponse<T> {
  constructor(
      public data: T,
      public message: string = 'Success',
      public statusCode: number = 200
  ) { }
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {

  constructor(
    @Inject('LOGS_SERVICE_TIENNT') private readonly logsService: LogsService,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => {
        const responseStatusCode = context.switchToHttp().getResponse().statusCode;
        return new ApiResponse<T>(data, 'Success', responseStatusCode);
      }),
      catchError(error => {
        this.logsService.createLog('error', error);
        return throwError(() => error);
      }),
    );
  }
}