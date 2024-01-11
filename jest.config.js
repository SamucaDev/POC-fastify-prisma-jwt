import dotenv from "dotenv";
dotenv.config({ path: './.env.test'});

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {  
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globalSetup: './test/jest.setup.ts',
  globalTeardown: './test/jest.teardown.ts'
};
