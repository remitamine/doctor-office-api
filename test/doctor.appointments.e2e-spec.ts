import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { MedicalSpeciality } from '../src/common/entities/doctor';

describe('Doctor Appointments (e2e)', () => {
  let app: INestApplication;
  let token: string;

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
    const res = await request(app.getHttpServer()).post('/doctor/login').send({
      email: 'test@test.com',
      password: 'test',
    });
    token = res.body.access_token;
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
  });

  it('tests appointment creation', () => {
    return request(app.getHttpServer())
      .post('/doctor/appointments')
      .send({
        patientId: 1,
        startTime: '2025-01-01T12:00:00Z',
        reason: 'test reason',
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(201);
  });

  it('tests appointment list', async () => {
    await request(app.getHttpServer())
      .post('/doctor/appointments')
      .send({
        patientId: 1,
        startTime: '2025-01-01T12:00:00Z',
        reason: 'test reason',
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(201);
    return request(app.getHttpServer())
      .get('/doctor/appointments')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect([
        {
          id: 1,
          startTime: '2025-01-01T12:00:00.000Z',
          reason: 'test reason',
          patient: {
            id: 1,
            name: 'test',
            email: 'test@test.com',
            birthDate: '2000-01-01',
            address: 'test address',
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
      .set('Authorization', 'Bearer ' + token)
      .expect(201);
    return request(app.getHttpServer())
      .get('/doctor/appointments/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({
        id: 1,
        startTime: '2025-01-01T12:00:00.000Z',
        reason: 'test reason',
        patient: {
          id: 1,
          name: 'test',
          email: 'test@test.com',
          birthDate: '2000-01-01',
          address: 'test address',
        },
      });
  });

  it('tests update appointment startTime', async () => {
    await request(app.getHttpServer())
      .post('/doctor/appointments')
      .send({
        patientId: 1,
        startTime: '2025-01-01T12:00:00Z',
        reason: 'test reason',
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(201);
    await request(app.getHttpServer())
      .patch('/doctor/appointments/1')
      .send({
        startTime: '2025-01-02T12:00:00Z',
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    return request(app.getHttpServer())
      .get('/doctor/appointments/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({
        id: 1,
        startTime: '2025-01-02T12:00:00.000Z',
        reason: 'test reason',
        patient: {
          id: 1,
          name: 'test',
          email: 'test@test.com',
          birthDate: '2000-01-01',
          address: 'test address',
        },
      });
  });

  it('tests appointment cancelation', async () => {
    await request(app.getHttpServer())
      .post('/doctor/appointments')
      .send({
        patientId: 1,
        startTime: '2025-01-01T12:00:00Z',
        reason: 'test reason',
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(201);
    await request(app.getHttpServer())
      .delete('/doctor/appointments/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    return (
      request(app.getHttpServer())
        .get('/doctor/appointments/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(404)
    );
  });

  afterEach(() => app.close());
});
