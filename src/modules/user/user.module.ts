import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUnique } from 'src/validators/is-unique.validator';
import { QueryModule } from 'src/common/query/query.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), QueryModule],
  providers: [UserService, IsUnique],
  controllers: [UserController],
  exports: [TypeOrmModule, TypeOrmModule.forFeature([User])],
})
export class UserModule { }
