import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

import { Patient } from '../../common/entities/patient';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), AuthModule],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
