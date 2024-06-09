import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Patient (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('tests current patient profile with authorization', () => {
    return request(app.getHttpServer()).get('/patient/profile').expect(401);
  });

  it('tests current patient profile', async () => {
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
    const res = await request(app.getHttpServer()).post('/patient/login').send({
      email: 'test@test.com',
      password: 'test',
    });
    return request(app.getHttpServer())
      .get('/patient/profile')
      .set('Authorization', 'Bearer ' + res.body.access_token)
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
