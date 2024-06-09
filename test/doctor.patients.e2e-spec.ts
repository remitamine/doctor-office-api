import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { MedicalSpeciality } from '../src/common/entities/doctor';

describe('Doctor Patients (e2e)', () => {
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

  it('tests patient list', () => {
    return request(app.getHttpServer())
      .get('/doctor/patients')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'test',
          email: 'test@test.com',
          birthDate: '2000-01-01',
          address: 'test address',
        },
      ]);
  });

  it('tests patient details', () => {
    return request(app.getHttpServer())
      .get('/doctor/patients/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({
        name: 'test',
        email: 'test@test.com',
        birthDate: '2000-01-01',
        address: 'test address',
      });
  });

  afterEach(() => app.close());
});
