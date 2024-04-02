import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as multipart from '@fastify/multipart';
import { writeFileSync } from 'fs';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 5 * 1024 * 1024 })
  );

  // upload file -----------------------------------
  app.register(multipart);

  // set up middlewares ----------------------------
  app.use(morgan('dev'));
  app.use(compression())
  // -----------------------------------------------

  app.register(require('@fastify/cors'), {
    origin: ['http://localhost:3000', 'https://skill-v3-admin.vercel.app' ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    preflightContinue: true,
  });
  // -----------------------------------------------

  app.useGlobalPipes(new ValidationPipe());

  // set up swagger --------------------------------
  const config = new DocumentBuilder()
    .setTitle('Skillcetera - API - Documentation')
    .setDescription('API for user interface development')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
    }
  });
  // -----------------------------------------------

  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'logs'),
  // });

  await app.listen(8080, '0.0.0.0');

}
bootstrap();
