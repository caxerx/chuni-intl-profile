import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import * as devcert from 'devcert';

async function bootstrap() {
  let devOptions;
  if (process.env.MODE === 'DEV') {
    const ssl = await devcert.certificateFor('local.dev');
    devOptions = {
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      },
      httpsOptions: ssl,
    };
  }

  const app = await NestFactory.create(AppModule, devOptions);

  app.use(json({ limit: '1gb' }));
  app.use(urlencoded({ limit: '1gb' }));

  await app.listen(+(process.env.PORT ?? 3000));
}
bootstrap();
