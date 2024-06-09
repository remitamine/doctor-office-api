import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup(
    'api/doctor',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Doctor REST API').addBearerAuth().build(),
      { include: [DoctorModule], deepScanRoutes: true },
    ),
  );
  SwaggerModule.setup(
    'api/patient',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Patient REST API')
        .addBearerAuth()
        .build(),
      { include: [PatientModule], deepScanRoutes: true },
    ),
  );
  await app.listen(3000);
}
bootstrap();
