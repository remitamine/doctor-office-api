import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Patient } from './common/entities/patient';
import { Doctor } from './common/entities/doctor';
import { DoctorModule } from './doctor/doctor.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Appointment } from './common/entities/appointment';
import { PatientModule } from './patient/patient.module';
import { EntityNotFoundExceptionFilter } from './common/filters/entity-not-found-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Appointment, Doctor, Patient],
      }),
      inject: [ConfigService],
    }),
    DoctorModule,
    PatientModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
