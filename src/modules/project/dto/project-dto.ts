import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty({ message: 'Campo requerido' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  status?: boolean;
}
