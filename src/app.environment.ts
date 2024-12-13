import * as dotenv from 'dotenv';
import { get } from 'env-var';

dotenv.config();

export enum Environment {
  LOCAL = 'Local',
  DEVELOPMENT = 'Development',
  STAGING = 'Staging',
  PRODUCTION = 'Production',
}

export const ENV = {
  NODE_ENV: get('NODE_ENV')
    .required()
    .asEnum<Environment>(Object.values(Environment)),

  PORT: get('PORT').default(4000).asPortNumber(),
  VERSION: get('VERSION').required().asString(),

  JWT_SECRET: get('JWT_SECRET').required().asString(),

  DB_USER: get('DB_USER').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_HOST: get('DB_HOST').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),
  DB_PORT: get('DB_PORT').required().asInt(),
};
