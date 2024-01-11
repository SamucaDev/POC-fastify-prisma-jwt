import {
  afterAll,
  beforeAll,
  describe,
  expect,
  test
} from "@jest/globals";
import { Chance } from "chance";
import { FastifyInstance } from "fastify";
import supertest from "supertest";
import { buildFastify } from "../../../src/services/server/application.service";
import HttpStatus from "../../../src/utils/http-status";

describe("Create User", () => {
  let fastify: FastifyInstance;
  let chance = new Chance();

  beforeAll(async () => {
    fastify = buildFastify();
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  describe('Success Cases', () => {
    test("POST Create user with status 201", async () => {
      const user = {
        email: chance.email(),
        password: chance.word({ length: 10 }),
        name: chance.name(),
      };
  
      const createUser = await supertest(fastify.server)
        .post("/api/users")
        .send(user)
        .expect(HttpStatus.CREATED);
  
      expect(createUser.body.email).toBe(user.email);
      expect(createUser.body.name).toBe(user.name);
    });
  });

  describe('Error Cases', () => {
    test("POST Create user with status 403", async () => {
      const user = {
        email: chance.email(),
        password: chance.word({ length: 3 }),
        name: chance.name(),
      };
  
      await supertest(fastify.server)
        .post("/api/users")
        .send(user)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
