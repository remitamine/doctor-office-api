import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DoctorGuard } from '../auth/doctor.guard';

@Controller('doctor/appointments')
@UseGuards(DoctorGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    await this.appointmentsService.create(createAppointmentDto, req.auth.sub);
    return;
  }

  @Get()
  findAll(@Request() req) {
    return this.appointmentsService.findByDoctorId(req.auth.sub);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.appointmentsService.findOne(+id, req.auth.sub);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(
      +id,
      updateAppointmentDto,
      req.auth.sub,
    );
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.appointmentsService.remove(+id, req.auth.sub);
  }
}
