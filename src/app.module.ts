import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { CommentModule } from './modules/comment/comment.module';
import { getTypeOrmConfig } from './config/database';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseExceptionFilter } from './filters/database-exception.filter';

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
        getTypeOrmConfig(configService),
    }),

    UserModule,
    ProjectModule,
    TaskModule,
    CommentModule,
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
