import { ApiProperty } from '@nestjs/swagger';

export abstract class AppointmentResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  reason: string;
}
