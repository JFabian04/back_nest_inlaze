import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    /**
     * Insercion de la data del usuario en la Tabla User
     * @param UserDto 
    */
    async create(userDto: UserDto): Promise<User> {
        try {
            // Encriptar la contraeña
            const saltRound = parseInt(process.env.SALT_ROUNDS);

            const hashPassword = await bcrypt.hash(userDto.password, saltRound);

            // Crear y gurdar el registro
            const user = this.userRepository.create({
                ...userDto,
                password: hashPassword,
            });

            return await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor: ' + error.message);
        }
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}
