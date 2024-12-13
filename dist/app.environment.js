"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.Environment = void 0;
const dotenv = require("dotenv");
const env_var_1 = require("env-var");
dotenv.config();
var Environment;
(function (Environment) {
    Environment["LOCAL"] = "Local";
    Environment["DEVELOPMENT"] = "Development";
    Environment["STAGING"] = "Staging";
    Environment["PRODUCTION"] = "Production";
})(Environment || (exports.Environment = Environment = {}));
exports.ENV = {
    NODE_ENV: (0, env_var_1.get)('NODE_ENV')
        .required()
        .asEnum(Object.values(Environment)),
    PORT: (0, env_var_1.get)('PORT').default(4000).asPortNumber(),
    VERSION: (0, env_var_1.get)('VERSION').required().asString(),
    JWT_SECRET: (0, env_var_1.get)('JWT_SECRET').required().asString(),
    DB_USER: (0, env_var_1.get)('DB_USER').required().asString(),
    DB_PASSWORD: (0, env_var_1.get)('DB_PASSWORD').required().asString(),
    DB_HOST: (0, env_var_1.get)('DB_HOST').required().asString(),
    DB_NAME: (0, env_var_1.get)('DB_NAME').required().asString(),
    DB_PORT: (0, env_var_1.get)('DB_PORT').required().asInt(),
};
//# sourceMappingURL=app.environment.js.map