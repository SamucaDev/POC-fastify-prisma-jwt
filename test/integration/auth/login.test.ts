import { describe, test, expect } from "@jest/globals";
import { Chance } from "chance";
import { FastifyInstance } from "fastify";
import { buildFastify } from "../../../src/services/server/application.service";
import supertest from "supertest";
import createUser from "../../../src/useCases/user/create/user-create.usecase";
import HttpStatus from "../../../src/utils/http-status";

describe("Find user test", () => {
  const chance = new Chance();
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = buildFastify();
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  describe("Success cases", () => {
    test("Login an user with status code 200", async () => {
      const userInformatinos = {
        email: chance.email(),
        password: chance.word({ length: 10 }),
        name: chance.name(),
      };

      await createUser(userInformatinos);

      const jwtToken = await supertest(fastify.server)
        .post("/api/auth/login")
        .send({
          email: userInformatinos.email,
          password: userInformatinos.password,
        })
        .expect(HttpStatus.OK);

      expect(jwtToken.body.accessToken).toBeDefined();
    });
  });

  describe("Error cases", () => {
    test("Error when try to login an user with status code 401", async () => {
      const userInformatinos = {
        email: chance.email(),
        password: chance.word({ length: 10 }),
        name: chance.name(),
      };

      await createUser(userInformatinos);

      const jwtToken = await supertest(fastify.server)
        .post("/api/auth/login")
        .send({
          email: userInformatinos.email,
          password: chance.word({ length: 10 }),
        })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(jwtToken.body?.accessToken).toBeUndefined();
    });
  });
});
