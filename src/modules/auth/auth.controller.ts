import { Controller, Post, Body, UseGuards, Get, Res, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';
import { AuthGuard } from './guards/auth.guard';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: AuthDto, @Res({ passthrough: true }) response: Response) {
    const data = await this.authService.login(loginDto, response);
    console.log(data);

    return { data: data }

  }

  @Get('protected')
  @UseGuards(AuthGuard) 
  getProtectedRoute(@Request() req) {
    return { 
      message: 'Acceso permitido',
      data: req.user, 
    };
  }

  @Get('logout')
  logout(@Res() response: Response) {
    try {
      response.clearCookie('token', { path: '/' });
      return response.status(200).send({ status: true, message: 'Logout successfully' });
    } catch (error) {
      return response.status(500).send({ status: false, message: 'Error el logout' });
    }
  }

}
