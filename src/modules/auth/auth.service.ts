import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth-dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: AuthDto, @Res({ passthrough: true }) response: Response) {
        try {
            const { email, password } = loginDto;

            const user = await this.userRepository.findOne({ where: { email }, relations: ['rol'], });
            if (!user) {
                throw new UnauthorizedException();
            }

            // compara la contraseña ingresada con la registrada
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException();
            }

            // genera el JWT con la dara del user
            const payload = { user_id: user.id, email: user.email, name: user.name, rol_id: user.rol.id, rol: user.rol.name  };
            const accessToken = this.jwtService.sign(payload);

            response.cookie('token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                // sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            return {
                accessToken,
                payload
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new HttpException('Credenciales incorrectas', 422);
            }

            throw new InternalServerErrorException('Error interno del servidor: ' + error.message);

        }
    }

}
