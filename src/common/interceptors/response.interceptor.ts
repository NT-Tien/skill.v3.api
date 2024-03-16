import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

 class ApiResponse<T> {
  constructor(
      public data: T,
      public message: string = 'Success',
      public statusCode: number = 200
  ) { }
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => {
        const responseStatusCode = context.switchToHttp().getResponse().statusCode;
        return new ApiResponse<T>(data, 'Success', responseStatusCode);
      }),
      catchError(error => {
        // re-throwws the error 500
        if (error.status >= 500) {
          return throwError(() => {
            return new ApiResponse<T>(null, error.message, 500);
          }); // Re-throw the exception
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}