import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { MedicalSpeciality } from '../src/common/entities/doctor';

describe('Patient Appointments (e2e)', () => {
  let app: INestApplication;
  let doctorToken: string;
  let patientToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer())
      .post('/doctor/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        specialization: MedicalSpeciality.Anesthesia,
      })
      .expect(201);
    let res = await request(app.getHttpServer()).post('/doctor/login').send({
      email: 'test@test.com',
      password: 'test',
    });
    doctorToken = res.body.access_token;
    await request(app.getHttpServer())
      .post('/patient/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        birthDate: '2000-01-01',
        address: 'test address',
      })
      .expect(201);
    res = await request(app.getHttpServer()).post('/patient/login').send({
      email: 'test@test.com',
      password: 'test',
    });
    patientToken = res.body.access_token;
  });

  it('tests appointment list', async () => {
    await request(app.getHttpServer())
      .post('/doctor/appointments')
      .send({
        patientId: 1,
        startTime: '2025-01-01T12:00:00Z',
        reason: 'test reason',
      })
      .set('Authorization', 'Bearer ' + doctorToken)
      .expect(201);
    return request(app.getHttpServer())
      .get('/patient/appointments')
      .set('Authorization', 'Bearer ' + patientToken)
      .expect(200)
      .expect([
        {
          id: 1,
          startTime: '2025-01-01T12:00:00.000Z',
          reason: 'test reason',
          doctor: {
            id: 1,
            name: 'test',
            email: 'test@test.com',
            specialization: MedicalSpeciality.Anesthesia,
          },
        },
      ]);
  });

  it('tests appointment details', async () => {
    await request(app.getHttpServer())
      .post('/doctor/appointments')
      .send({
        patientId: 1,
        startTime: '2025-01-01T12:00:00Z',
        reason: 'test reason',
      })
      .set('Authorization', 'Bearer ' + doctorToken)
      .expect(201);
    return request(app.getHttpServer())
      .get('/patient/appointments/1')
      .set('Authorization', 'Bearer ' + patientToken)
      .expect(200)
      .expect({
        id: 1,
        startTime: '2025-01-01T12:00:00.000Z',
        reason: 'test reason',
        doctor: {
          id: 1,
          name: 'test',
          email: 'test@test.com',
          specialization: MedicalSpeciality.Anesthesia,
        },
      });
  });

  afterEach(() => app.close());
});
