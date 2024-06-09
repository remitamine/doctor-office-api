import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { MedicalSpeciality } from '../src/common/entities/doctor';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('tests register without name', () => {
    return request(app.getHttpServer())
      .post('/doctor/register')
      .send({
        email: 'test@test.com',
        password: 'test',
        specialization: MedicalSpeciality.Anesthesia,
      })
      .expect(400);
  });

  it('tests register with invalid name', () => {
    return request(app.getHttpServer())
      .post('/doctor/register')
      .send({
        name: 1,
        email: 'test@test.com',
        password: 'test',
        specialization: MedicalSpeciality.Anesthesia,
      })
      .expect(400);
  });

  it('tests register with empty name', () => {
    return request(app.getHttpServer())
      .post('/doctor/register')
      .send({
        name: '',
        email: 'test@test.com',
        password: 'test',
        specialization: MedicalSpeciality.Anesthesia,
      })
      .expect(400);
  });

  it('tests register with invalid email', () => {
    return request(app.getHttpServer())
      .post('/doctor/register')
      .send({
        name: 'test',
        email: 'test',
        password: 'test',
        specialization: MedicalSpeciality.Anesthesia,
      })
      .expect(400);
  });

  it('tests incorrect email', async () => {
    await request(app.getHttpServer())
      .post('/doctor/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        specialization: MedicalSpeciality.Anesthesia,
      })
      .expect(201);
    return request(app.getHttpServer())
      .post('/doctor/login')
      .send({
        email: 'test1@test.com',
        password: 'test',
      })
      .expect(404);
  });

  it('tests incorrect passoword', async () => {
    await request(app.getHttpServer())
      .post('/doctor/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        specialization: MedicalSpeciality.Anesthesia,
      })
      .expect(201);
    return request(app.getHttpServer())
      .post('/doctor/login')
      .send({
        email: 'test@test.com',
        password: 'test1',
      })
      .expect(401);
  });

  afterEach(() => app.close());
});
