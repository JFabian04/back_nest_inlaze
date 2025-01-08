import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

export interface QueryParams {
  page?: number; 
  limit?: number;
  search?: string;
  sortField?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: any;
}

@Injectable()
export class QueryService {
  async findWithPaginationAndFilters<T>(
    params: QueryParams,
    repository: Repository<T>
  ): Promise<{ data: T[], total: number }> {
    console.log('PARAMS: ', params);
    
    const page = params.page ? Number(params.page) : 1; 
    const limit = params.limit ? Number(params.limit) : 10;

    const { search, sortField, sortOrder, filters } = params;


    if (isNaN(page) || isNaN(limit)) {
      throw new Error('Los parámetros de paginación deben ser números válidos.');
    }

    const queryBuilder = repository.createQueryBuilder();

    // Filtros dinamicos
    if (filters) {
      Object.keys(filters).forEach((key) => {
        queryBuilder.andWhere(`${key} = :${key}`, { [key]: filters[key] });
      });
    }

    // Búsqueda
    if (search) {
      queryBuilder.andWhere('LOWER(name) LIKE :search OR LOWER(description) LIKE :search', {
        search: `%${search.toLowerCase()}%`
      });
    }

    // Ordenación
    if (sortField) {
      queryBuilder.orderBy(sortField, sortOrder || 'ASC');
    }

    // Paginación
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }
}
