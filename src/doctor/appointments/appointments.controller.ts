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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DoctorGuard } from '../auth/doctor.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('doctor/appointments')
@ApiBearerAuth()
@UseGuards(DoctorGuard)
@ApiUnauthorizedResponse()
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
  @ApiNotFoundResponse()
  findOne(@Request() req, @Param('id') id: string) {
    return this.appointmentsService.findOne(+id, req.auth.sub);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    await this.appointmentsService.update(
      +id,
      updateAppointmentDto,
      req.auth.sub,
    );
    return;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    await this.appointmentsService.remove(+id, req.auth.sub);
    return;
  }
}
