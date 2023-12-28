import { FastifyInstance } from "fastify";
import { createUser, findAllUser, findUser } from "../controllers/user.controller";
import { $ref } from "../schemas/user.schema";

export async function userRoutes(app: FastifyInstance) {
  app.get(
    "/:id",
    {
      schema: {
        response: {
          200: $ref("findUserSchema"),
        },
      },
      preHandler: [app.authenticate],
    },
    findUser
  );

  app.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    createUser
  );

  app.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("getUsersSchema"),
        },
      },
      preHandler: [app.authenticate],
    },
    findAllUser
  );

  app.log.info("user routes registered");
}
