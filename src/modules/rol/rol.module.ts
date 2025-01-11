import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entitites/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule.forFeature([Rol])]
})
export class RolModule {}
