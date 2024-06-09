import { ApiProperty } from '@nestjs/swagger';
import { PatientResponse } from './patient.response';
import { AppointmentResponse } from './appointment.response';

export class DoctorAppointmentResponse extends AppointmentResponse {
  @ApiProperty()
  patient: PatientResponse;
}
