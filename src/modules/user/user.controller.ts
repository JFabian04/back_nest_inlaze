import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    /**
     * Registrar usuario
     * @param userDto
     */
    @Post('register')
    async register(@Body() userDto: UserDto) {
        await this.userService.create(userDto);
        return {
          message: 'Usuario registrado con éxito.',
        };
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

}
