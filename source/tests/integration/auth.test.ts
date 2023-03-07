import request from 'supertest';
import app from '../../app';
import {prisma } from '../../utils/db';

describe('Test for Signing Up Endpoint', () => {
  it('Should send a 200 status code if all input is valid', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      username: 'username',
      email: 'username@gmail.com',
      password: 'username',
    });
    expect(response.statusCode).toBe(200);
  });

  it('Should send a 400 status code if some input is invalid', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      username: 'username',
      email: 'name', // this is an invalid email adress
      password: 'username',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('Test for Signing in Endpoint', () => {
  it('Should send a 200 status code and token for a valid user', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      username: 'username',
      email: 'username@gmail.com',
      password: 'username',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined;
  });

  it('Should send a 400 status code if some input is invalid', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'name', // this is an invalid email adress
      password: 'username',
    });
    expect(response.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await prisma.user.deleteMany();
  prisma.$disconnect();
});
