import { config } from "dotenv";
import { DataSource } from "typeorm";

config({
    path: `.env${process.env.NODE_ENV === 'production' ? '.production' : ''}`
});

const isDevelopment = process.env.NODE_ENV === 'development';
export default new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: isDevelopment,
    migrationsRun: !isDevelopment,
})