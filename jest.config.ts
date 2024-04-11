import type {Config} from 'jest';

const config: Config = {
  verbose: true,
};
module.exports = {
  testTimeout: 20000,
  preset: 'ts-jest', 
  testEnvironment: 'node', 
};

export default config;