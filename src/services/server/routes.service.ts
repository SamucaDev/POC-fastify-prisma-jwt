import { authRoutes } from "../../routes/auth.route";
import { userRoutes } from "../../routes/user.route";

export const routes = [
  {
    useCase: userRoutes,
    url: 'users'
  },
  {
    useCase: authRoutes,
    url: 'auth'
  }
];
