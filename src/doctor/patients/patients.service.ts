import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from '../../common/entities/patient';
import { PatientResponse } from '../../common/responses/patient.response';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<PatientResponse[]> {
    return this.patientRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        address: true,
      },
    });
  }

  findOne(id: number): Promise<PatientResponse> {
    return this.patientRepository.findOneOrFail({
      where: { id },
      select: { name: true, email: true, birthDate: true, address: true },
    });
  }
}
