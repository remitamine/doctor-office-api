import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment } from '../../common/entities/appointment';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  findByPatientId(id: number) {
    return this.appointmentRepository.find({
      where: { patient: { id } },
      select: {
        id: true,
        doctor: {
          id: true,
          name: true,
          email: true,
          specialization: true,
        },
        startTime: true,
        reason: true,
      },
      relations: { doctor: true },
    });
  }

  findOne(id: number, patientId: number) {
    return this.appointmentRepository.findOneOrFail({
      where: { id, patient: { id: patientId } },
      select: {
        id: true, // TODO: remove when https://github.com/typeorm/typeorm/issues/4159 is fixed
        doctor: {
          id: true,
          name: true,
          email: true,
          specialization: true,
        },
        startTime: true,
        reason: true,
      },
      relations: { doctor: true },
    });
  }
}
