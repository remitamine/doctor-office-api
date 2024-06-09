import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

import { AppointmentsModule } from './appointments/appointments.module';
import { PatientsModule } from './patients/patients.module';

import { Doctor } from '../common/entities/doctor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    AppointmentsModule,
    PatientsModule,
    AuthModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
