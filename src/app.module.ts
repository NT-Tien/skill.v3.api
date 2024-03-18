import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPE_ORM_CONFIG } from './config/orm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { MyMiddlewareModule } from './middlewares/middleware.module';
import { MONGO_CONFIG, MONGO_HOST } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs-mongo/logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPE_ORM_CONFIG),
    MongooseModule.forRoot(MONGO_HOST, MONGO_CONFIG),
    LogsModule,
    MyMiddlewareModule,
    AuthModule,
  ], 
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule { } 