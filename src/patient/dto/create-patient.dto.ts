import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
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

  @ApiProperty({ format: 'date' })
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  address: string;
}
