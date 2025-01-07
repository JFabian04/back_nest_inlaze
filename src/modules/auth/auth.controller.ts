import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  getProtectedRoute() {
    return { message: 'Acceso permitido', user: 'Información de usuario protegida' };
  }
}
