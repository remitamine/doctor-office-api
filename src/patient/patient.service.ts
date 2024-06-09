import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from '../common/entities/patient';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto) {
    return this.patientRepository.insert(createPatientDto);
  }

  findOneById(id: number) {
    return this.patientRepository.findOneOrFail({
      where: { id },
      select: { name: true, email: true, birthDate: true, address: true },
    });
  }

  findOneByEmail(email: string) {
    return this.patientRepository.findOneOrFail({
      where: { email },
      select: { id: true, password: true },
    });
  }
}
