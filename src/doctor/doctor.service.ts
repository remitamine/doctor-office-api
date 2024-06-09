import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Doctor } from '../common/entities/doctor';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorRepository.insert(createDoctorDto);
  }

  findOneById(id: number) {
    return this.doctorRepository.findOneOrFail({
      where: { id },
      select: { name: true, email: true, specialization: true },
    });
  }

  findOneByEmail(email: string) {
    return this.doctorRepository.findOneOrFail({
      where: { email },
      select: { id: true, password: true },
    });
  }
}
