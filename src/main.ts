import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Proyecto Henry M4')
    .setDescription('API para un e-commerce')
    .setVersion('1.0.0')  
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const logger = new LoggerMiddleware();
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(logger.use);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
