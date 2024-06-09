import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { MedicalSpeciality } from '../src/common/entities/doctor';

describe('Doctor (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('tests current doctor profile with authorization', () => {
    return request(app.getHttpServer()).get('/doctor/profile').expect(401);
  });

  it('tests current doctor profile', async () => {
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
    return request(app.getHttpServer())
      .get('/doctor/profile')
      .set('Authorization', 'Bearer ' + res.body.access_token)
      .expect(200)
      .expect({
        name: 'test',
        email: 'test@test.com',
        specialization: MedicalSpeciality.Anesthesia,
      });
  });

  afterEach(() => app.close());
});
