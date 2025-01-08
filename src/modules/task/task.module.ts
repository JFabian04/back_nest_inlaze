import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { QueryModule } from 'src/common/query/query.module';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), QueryModule, UserModule, ProjectModule],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TypeOrmModule.forFeature([Task])],
})
export class TaskModule { }
