import { IsNotEmpty, IsOptional, IsString, IsDate, IsInt, IsBoolean } from 'class-validator';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/entities/user.entity';
import { Type } from 'class-transformer';

export class CommentDto {
    @IsNotEmpty({ message: 'El contenido del comentario es obligatorio.' })
    content: string;

    @IsNotEmpty({ message: 'Campo requerido' })
    task: number;

    @IsNotEmpty({ message: 'Campo requerido' })
    user: number;
    
    @IsOptional()
    @IsBoolean({ message: 'Tipo de dato incorrecto' })
    read: boolean;
}