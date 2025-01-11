import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { QueryService } from 'src/common/query/query.service';
import { existsForeignValidator } from 'src/validators/exists-validator';
import { Rol } from '../rol/entitites/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)private userRepository: Repository<User>,
        @InjectRepository(Rol)private rolRepository: Repository<Rol>, 
        private readonly queryService: QueryService,
    ) { }

    /**
     * Insercion de la data del usuario en la Tabla User
     * @param UserDto 
    */
    async create(userDto: UserDto): Promise < User > {

    const rep = await existsForeignValidator(this.userRepository, userDto.email, 'email', null, false);

    if(rep !== null) {
    const validationError = {
        status: 'error',
        message: 'Validation failed',
        errors: [
            {
                field: 'email',
                constraints: {
                    isEmail: 'El email ya ha sido registrado'
                }
            }
        ]
    };
    throw new BadRequestException(validationError);
}

// Encriptar la contraseña
const saltRound = parseInt(process.env.SALT_ROUNDS);

const hashPassword = await bcrypt.hash(userDto.password, saltRound);

// Crear y gurdar el registro
const rol = await this.rolRepository.findOne({ where: { id: userDto.rol } })
const user = this.userRepository.create({
    ...userDto,
    password: hashPassword,
    rol,
});

return await this.userRepository.save(user);

    }

    async findAll(params): Promise < { data: User[], total: number } > {
    return await this.queryService.findWithPaginationAndFilters(params, this.userRepository);
}
}
