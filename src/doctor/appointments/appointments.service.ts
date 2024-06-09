import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from '../../common/entities/appointment';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto, doctorId: number) {
    const { patientId, ...appointment } = createAppointmentDto;
    return this.appointmentRepository.insert({
      doctor: { id: doctorId },
      patient: { id: patientId },
      ...appointment,
    });
  }

  findByDoctorId(id: number) {
    return this.appointmentRepository.find({
      where: { doctor: { id } },
      select: {
        id: true,
        patient: {
          id: true,
          name: true,
          email: true,
          birthDate: true,
          address: true,
        },
        startTime: true,
        reason: true,
      },
      relations: { patient: true },
    });
  }

  findOne(id: number, doctorId: number) {
    return this.appointmentRepository.findOneOrFail({
      where: { id, doctor: { id: doctorId } },
      select: {
        id: true, // TODO: remove when https://github.com/typeorm/typeorm/issues/4159 is fixed
        patient: {
          id: true,
          name: true,
          email: true,
          birthDate: true,
          address: true,
        },
        startTime: true,
        reason: true,
      },
      relations: { patient: true },
    });
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
    doctorId: number,
  ) {
    await this.appointmentRepository.update(
      { id, doctor: { id: doctorId } },
      updateAppointmentDto,
    );
    return;
  }

  remove(id: number, doctorId: number) {
    return this.appointmentRepository.delete({ id, doctor: { id: doctorId } });
  }
}
