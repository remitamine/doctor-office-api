import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsISO8601()
  startTime: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  reason: string;
}
