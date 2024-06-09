import { Column, Entity, OneToMany } from 'typeorm';

import { User } from './user';
import { Appointment } from './appointment';

@Entity()
export class Patient extends User {
  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  address: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
