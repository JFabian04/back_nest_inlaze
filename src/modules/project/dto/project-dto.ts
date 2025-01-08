import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty({ message: 'Campo requerido' })
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  status?: boolean;
}
