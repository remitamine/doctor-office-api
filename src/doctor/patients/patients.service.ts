import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from '../../common/entities/patient';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  findAll() {
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

  findOne(id: number) {
    return this.patientRepository.findOneOrFail({
      where: { id },
      select: { name: true, email: true, birthDate: true, address: true },
    });
  }
}
