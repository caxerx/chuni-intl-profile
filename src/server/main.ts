import {
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ChuniRecordSubmitPipe } from './modules/chuni-record/chuni-record-submit.pipe';
import { RenderService } from 'nest-next';

async function createDevOptions(): Promise<NestApplicationOptions> {
  const devcert = await import('devcert');
  const ssl = await devcert.certificateFor('local.dev');
  return {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
    httpsOptions: ssl,
  };
}

async function setupSwagger(appPromise: Promise<INestApplication>) {
  const app = await appPromise;

  const config = new DocumentBuilder()
    .setTitle('Chunithm Intl Profile Server')
    .setDescription('Chunithm Intl Profile Backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  return app;
}

async function setupApp(devOptions?: Promise<NestApplicationOptions>) {
  const app = await NestFactory.create(
    AppModule,
    (await devOptions) ?? {
      cors: {
        origin: 'https://chunithm-net-eng.com',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      },
    },
  );

  app.useGlobalPipes(new ChuniRecordSubmitPipe(), new ValidationPipe());

  app.use(json({ limit: '1gb' }));
  app.use(urlencoded({ extended: true, limit: '1gb' }));
  return app;
}

export async function bootstrap(appPromise: Promise<INestApplication>) {
  const app = await appPromise;
  await app.listen(+(process.env.PORT ?? 3000));

  const renderService = app.get(RenderService);
  renderService.setErrorHandler(async (err, req, res) => {
    res.send(err.response);
  });
}

if (process.env.MODE == 'DEV') {
  const app = setupSwagger(setupApp(createDevOptions()));
  bootstrap(app);
} else {
  const app = setupApp();
  bootstrap(app);
}
