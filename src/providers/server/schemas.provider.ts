import { authSchemas } from "../../schemas/auth.schema";
import { userSchemas } from "../../schemas/user.schema";

export const schemas = [
  ...userSchemas,
  ...authSchemas
]