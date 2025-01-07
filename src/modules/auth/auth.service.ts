import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: AuthDto) {
        try {
            const { email, password } = loginDto;

            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new UnauthorizedException();
            }

            // compara la contraseña ingresada con la registrada
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException();
            }

            // genera el JWT con la dara del user
            const payload = { userId: user.id, email: user.email };
            const accessToken = this.jwtService.sign(payload);

            return {
                accessToken,
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Credenciales incorrectas');
            }

            throw new InternalServerErrorException('Error interno del servidor: ' + error.message);

        }
    }

}
