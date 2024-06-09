import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor';
import { Patient } from './patient';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @ManyToOne(() => Patient)
  patient: Patient;

  @Column({
    type: 'timestamp',
  })
  startTime: Date;

  @Column()
  reason: string;
}
