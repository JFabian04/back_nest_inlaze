import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { QueryModule } from 'src/common/query/query.module';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), QueryModule, UserModule, TaskModule],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule { }
