import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { CommentModule } from './modules/comment/comment.module';
import { getDatabaseConfig  } from './database/config';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseExceptionFilter } from './utils/database-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { RolModule } from './modules/rol/rol.module';

@Module({
  imports: [
    // config de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // configuracion del ORM (conexion a la bd)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig (configService),
    }),

    UserModule,
    ProjectModule,
    TaskModule,
    CommentModule,
    AuthModule,
    RolModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER, 
      useClass: DatabaseExceptionFilter,
    },
  ],
})
export class AppModule {}
