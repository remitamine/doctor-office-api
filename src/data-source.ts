import { DataSource } from 'typeorm';

import { Appointment } from './common/entities/appointment';
import { Doctor } from './common/entities/doctor';
import { Patient } from './common/entities/patient';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Appointment, Doctor, Patient],
  migrations: ['dist/migrations/*.js'],
});
