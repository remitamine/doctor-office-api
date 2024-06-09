import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PatientGuard } from '../auth/patient.guard';

@Controller('patient/appointments')
@UseGuards(PatientGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll(@Request() req) {
    return this.appointmentsService.findByPatientId(req.auth.sub);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.appointmentsService.findOne(+id, req.auth.sub);
  }
}
