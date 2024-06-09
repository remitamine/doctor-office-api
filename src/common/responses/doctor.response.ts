import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';
import { MedicalSpeciality } from '../entities/doctor';

export class DoctorResponse extends UserResponse {
  @ApiProperty()
  specialization: MedicalSpeciality;
}
