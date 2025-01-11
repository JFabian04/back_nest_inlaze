import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { QueryModule } from 'src/common/query/query.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), QueryModule, AuthModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [TypeOrmModule.forFeature([Project])]
})
export class ProjectModule { }
