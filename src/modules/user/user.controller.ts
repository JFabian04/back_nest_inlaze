import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { QueryParams } from '../../common/query/query.service';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    /**
     * Registrar usuario
     * @param userDto
     */
    @Post()
    async register(@Body() userDto: UserDto) {
        await this.userService.create(userDto);
        return {
            message: 'Usuario registrado con éxito.',
        };
    }

    @Get()
    async findAll(@Query() query: QueryParams) {
        return await this.userService.findAll(query);
    }

}
