import {
  IsDefined,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsDefined()
  @IsInt()
  patientId: number;

  @IsDefined()
  @IsISO8601()
  startTime: Date;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  reason: string;
}
