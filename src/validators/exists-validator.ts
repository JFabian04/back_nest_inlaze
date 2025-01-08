import { Repository, FindOptionsWhere } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export async function existsForeignValidator<T>(
    repository: Repository<T>,
    param: any,
    field: string
): Promise<T> {
    const whereCondition: FindOptionsWhere<T> = {
        [field]: param,
    } as FindOptionsWhere<T>;

    const entity = await repository.findOne({ where: whereCondition });

    if (!entity) {
        throw new NotFoundException(`${field.charAt(0).toUpperCase() + field.slice(1)} no encontrado: ${param}`);
    }
    return entity;
}
