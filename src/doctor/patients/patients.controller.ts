import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { DoctorGuard } from '../auth/doctor.guard';

@Controller('doctor/patients')
@UseGuards(DoctorGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }
}
