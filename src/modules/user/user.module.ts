import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryModule } from '../../common/query/query.module';
import { RolModule } from '../rol/rol.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), QueryModule, RolModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, TypeOrmModule.forFeature([User])],
})
export class UserModule { }
