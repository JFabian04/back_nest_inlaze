import { Type } from 'class-transformer';
import {IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class TaskDto {
    @IsNotEmpty({ message: 'Campo requerido' })
    title: string;

    @IsNotEmpty({ message: 'Campo requerido' })
    @IsOptional()
    description?: string;

    @IsNotEmpty({ message: 'Campo requerido' })
    @IsDate()
    @Type(() => Date)
    dateLimit: Date;

    @IsNotEmpty({ message: 'Campo requerido' })
    user: number;

    @IsNotEmpty({ message: 'Campo requerido' })
    project: number;
}
