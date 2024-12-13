import { DataSource, DataSourceOptions } from 'typeorm';

import { ENV } from '@/app.environment';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: ENV.DB_HOST,
  port: +ENV.DB_PORT,
  username: ENV.DB_USER,
  database: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/config/migrations/*.js'],
  ssl: true,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
