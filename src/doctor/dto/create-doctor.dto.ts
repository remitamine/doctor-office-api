import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { MedicalSpeciality } from '../../common/entities/doctor';

export class CreateDoctorDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
  @IsEnum(MedicalSpeciality)
  specialization: MedicalSpeciality;
}
