declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    APP_PORT: string;
    JWT_SECRET: string;
  }
}