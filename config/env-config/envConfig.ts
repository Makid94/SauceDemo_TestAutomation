import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, './.env') });

type EnvConfig = {
  baseURL: string;
  username: string;
  password: string;
};

const getEnvConfig = (env: string): EnvConfig => {
  const upperCaseEnv = env.toUpperCase();

  let config: EnvConfig;

  switch (upperCaseEnv) {
    case 'QA':
      config = {
        baseURL: process.env.QA_BASEURL!,
        username: process.env.QA_USERNAME!,
        password: process.env.QA_PASSWORD!,
      };
      break;
    case 'STAGING':
      config = {
        baseURL: process.env.STAGING_BASEURL!,
        username: process.env.STAGING_USERNAME!,
        password: process.env.STAGING_PASSWORD!,
      };
      break;
    case 'PROD':
      config = {
        baseURL: process.env.PROD_BASEURL!,
        username: process.env.PROD_USERNAME!,
        password: process.env.PROD_PASSWORD!,
      };
      break;
    default:
      throw new Error(
        `Invalid environment value: ${env}. Expected one of QA, STAGING, PROD.`
      );
  }

  return config;
};

export default getEnvConfig;
