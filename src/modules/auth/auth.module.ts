import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET || 'defaultSecret',
        signOptions: { expiresIn: process.env.JWT_EXPIRE || '48h' },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
