"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const app_environment_1 = require("../app.environment");
exports.dataSourceOptions = {
    type: 'postgres',
    host: app_environment_1.ENV.DB_HOST,
    port: +app_environment_1.ENV.DB_PORT,
    username: app_environment_1.ENV.DB_USER,
    database: app_environment_1.ENV.DB_NAME,
    password: app_environment_1.ENV.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: ['dist/config/migrations/*.js'],
    ssl: true,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=typeorm.config.js.map