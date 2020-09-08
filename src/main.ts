import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { warn } from 'console';
import * as logger from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('SMARTEDU API')
    .setDescription('Swagger docs for smartEdu')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [],
  });
  SwaggerModule.setup('docs', app, document);
  const PORT = process.env.PORT || 3001;
  app.enableCors();
  app.use(logger('dev'));
  await app.listen(PORT);
  warn('Swagger run on', `http://127.0.0.1:${PORT}/docs`);
  warn('Server run on', `http://127.0.0.1:${PORT}/`);
}
bootstrap();
