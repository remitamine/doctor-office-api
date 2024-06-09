import { ApiProperty } from '@nestjs/swagger';
import { DoctorResponse } from './doctor.response';
import { AppointmentResponse } from './appointment.response';

export class PatientAppointmentResponse extends AppointmentResponse {
  @ApiProperty()
  doctor: DoctorResponse;
}
