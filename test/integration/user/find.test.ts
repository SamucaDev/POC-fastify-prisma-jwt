import { describe, expect, test } from '@jest/globals';
import { Chance } from 'chance';
import { FastifyInstance } from 'fastify';
import sinon from 'sinon';
import supertest from 'supertest';
import { User } from '../../../src/interfaces/user.interface';
import * as userRepository from '../../../src/repositories/user.repository';
import { signToken } from '../../../src/services/jwt/jwt.service';
import { buildFastify } from '../../../src/services/server/application.service';
import HttpStatus from '../../../src/utils/http-status';

describe('Find user test', () => {
  const chance = new Chance();
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = buildFastify();
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });


  test('Find an user with status code 200', async () => {
    const user: User = {
      id: chance.guid(),
      email: chance.email(),
      name: chance.name(),
    }

    const createUserStub = sinon.stub(userRepository, 'find').resolves({
      data: user,
    });
    
    const token = signToken(user, fastify.jwt);

    const userLogged = await supertest(fastify.server)
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);
    
    expect(createUserStub.calledOnce).toBeTruthy();
    expect(userLogged.body).toMatchObject({...user});
  });
});