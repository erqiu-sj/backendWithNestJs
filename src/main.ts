import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommonErrorFilter } from './common/filter/response/response.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CommonErrorFilter());
  const swaggerOps = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('services')
    .setVersion('v1')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOps);
  SwaggerModule.setup('doc', app, document);
  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}

bootstrap();
