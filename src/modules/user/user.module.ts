import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUnique } from 'src/validators/is-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, IsUnique],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
