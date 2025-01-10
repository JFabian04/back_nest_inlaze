import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsOptional, ArrayNotEmpty, IsInt, IsArray, IsEnum } from 'class-validator';
import { Status } from '../entities/task.entity';

export class TaskDto {
    @IsNotEmpty({ message: 'Campo requerido' })
    title: string;

    // @IsNotEmpty({ message: 'Campo requerido' })
    @IsOptional()
    description?: string;

    @IsNotEmpty({ message: 'Campo requerido' })
    @IsDate({ message: 'Campo requerido' })
    @Type(() => Date)
    date_limit: Date;

    @IsArray({ message: 'Campo requerido' })
    @ArrayNotEmpty({ message: 'Campo requerido' })
    @IsInt({ each: true })
    users: number[];

    @IsOptional()
    @IsEnum(Status, { message: 'El estado no es válido' })
    status?: Status;


    @IsNotEmpty({ message: 'Campo requerido' })
    project: number;
}
