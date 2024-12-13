export declare enum Environment {
    LOCAL = "Local",
    DEVELOPMENT = "Development",
    STAGING = "Staging",
    PRODUCTION = "Production"
}
export declare const ENV: {
    NODE_ENV: Environment;
    PORT: number;
    VERSION: string;
    JWT_SECRET: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PORT: number;
};
