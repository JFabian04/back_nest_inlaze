import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { QueryModule } from '../../common/query/query.module';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';
import { CommentGateway } from '../../utils/socket/comment-gateway/comment.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), QueryModule, UserModule, TaskModule],
  providers: [CommentService, CommentGateway],
  controllers: [CommentController]
})
export class CommentModule { }
