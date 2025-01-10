import { Repository, FindOptionsWhere } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export async function existsForeignValidator<T>(
    repository: Repository<T>,
    param: any,
    field: string,
    key: string = null,
    mode: boolean = true,
): Promise<T[]> {
    let data = param;
    if (!Array.isArray(param)) {
        data = [param];
    }

    const entities: T[] = [];

    for (const item of data) {
        const whereCondition: FindOptionsWhere<T> = { [field]: item } as FindOptionsWhere<T>;

        const entity = await repository.findOne({ where: whereCondition });

        if (!entity) {
            if (mode) {
                
                throw new NotFoundException(
                    `${key ? key : ''} ${field.charAt(0).toUpperCase() + field.slice(1)} no encontrado: ${item}`
                );
            }else{
                return null
            }
        }

        entities.push(entity);
    }

    return entities;
}