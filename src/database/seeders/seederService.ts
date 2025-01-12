import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rol } from '../../modules/rol/entitites/role.entity';
import { User } from '../../modules/user/entities/user.entity';

@Injectable()
export class SeederService {
  constructor(private readonly connection: Connection) {}

  async createRoles() {
    const roles = ['admin', 'user'];

    for (const roleName of roles) {
      const existingRole = await this.connection
        .getRepository(Rol)
        .findOne({ where: { name: roleName } });

      if (!existingRole) {
        await this.connection.getRepository(Rol).save({ name: roleName });
        console.log(`Rol ${roleName} creado.`);
      } else {
        console.log(`Rol ${roleName} ya existe (omitiendo).`);
      }
    }
  }

  async createAdminUser() {
    const adminRole = await this.connection
      .getRepository(Rol)
      .findOne({ where: { name: 'admin' } });
      
      const userRole = await this.connection
      .getRepository(Rol)
      .findOne({ where: { name: 'user' } });
      
      if (!adminRole) {
        console.error('Rol de Admin no encontrado!');
        return;
      }
      
      if (!userRole) {
      console.error('No se encontró Rol de usuario!');
      return;
    }

    const existingAdmin = await this.connection
    .getRepository(User)
    .findOne({ where: { name: 'admin' } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('12345Aa', 10);
      
      await this.connection.getRepository(User).save({
        name: 'Admin',  
        email: 'admin@gmail.com',
        password: hashedPassword,
        rol: adminRole, 
      });

      console.log('Usuario Admin creado.');
    } else {
      console.log('Admin ya existe (omitiendo).');
    }
  }

  async seed() {
    await this.createRoles();
    await this.createAdminUser();
  }
}
