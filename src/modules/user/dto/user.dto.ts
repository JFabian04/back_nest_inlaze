import { IsString, MinLength, IsNotEmpty, IsEmail, IsOptional, Matches, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/is-unique.validator';

export class UserDto {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*/, {
    message: 'La contraseña debe incluir al menos una mayúscula, una minúscula y un número',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name?: string;

  @IsOptional()
  rol: number

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
//   @Validate(IsUnique, ['User', 'email'])
  email?: string;
}
