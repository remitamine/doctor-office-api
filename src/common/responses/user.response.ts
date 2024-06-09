import { ApiProperty } from '@nestjs/swagger';

export abstract class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
