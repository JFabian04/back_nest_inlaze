import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsInt, IsPositive, IsOptional } from 'class-validator';
import { User } from '../../user/entities/user.entity';

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
    assignedTo: User;
}
