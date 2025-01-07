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
        try {
            return this.userService.create(userDto);
        } catch (error) {
            // Capturar y manejar errores generados en el servicio
            throw new HttpException(
                error.response || 'Error interno del servidor.',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

}
