import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

import { Patient } from '../common/entities/patient';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    AuthModule,
    AppointmentsModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
