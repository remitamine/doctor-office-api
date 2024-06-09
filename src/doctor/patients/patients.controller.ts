import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { DoctorGuard } from '../auth/doctor.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('doctor/patients')
@ApiBearerAuth()
@UseGuards(DoctorGuard)
@ApiUnauthorizedResponse()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }
}
