import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

// Configuración común para TypeORM y NestJS
export const getDatabaseConfig = (configService: ConfigService): DataSourceOptions => {
  const isDevelopment = configService.get<string>('NODE_ENV') === 'development';

  return {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: isDevelopment,
    migrationsRun: !isDevelopment
  };
};
