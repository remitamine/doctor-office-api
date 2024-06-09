import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';

export class PatientResponse extends UserResponse {
  @ApiProperty({ format: 'date' })
  birthDate: Date;

  @ApiProperty()
  address: string;
}
