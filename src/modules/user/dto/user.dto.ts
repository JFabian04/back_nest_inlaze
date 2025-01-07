import { IsString, MinLength, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
    @IsOptional()
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password?: string;

    @IsOptional() 
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional() 
    @IsString()
    @MinLength(3)
    username?: string;
    
    @IsOptional() 
    @IsEmail()
    email?: string;
}
