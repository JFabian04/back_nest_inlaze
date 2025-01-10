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
    repository: Repository<T>,
    relations?: string[],  
    joinTableFilters?: any
  ): Promise<{ data: T[], total: number }> {
    console.log('PARAMS: ', params);
  
    const page = params.page ? Number(params.page) : 1;
    const limit = params.limit ? Number(params.limit) : 10;
  
    const { search, sortField, sortOrder, filters } = params;
  
    if (isNaN(page) || isNaN(limit)) {
      throw new Error('Los parámetros de paginación deben ser números válidos.');
    }
  
    const queryBuilder = repository.createQueryBuilder();
  
    // Joins dinámicos
    if (relations && relations.length > 0) {
      relations.forEach(relation => {
        const alias = relation.split('.').pop();
        queryBuilder.leftJoinAndSelect(`${repository.metadata.name}.${relation}`, alias);
      });
    }
  
    // Filtro para tablas intermedias
    if (joinTableFilters) {
      Object.keys(joinTableFilters).forEach((key) => {
        if (joinTableFilters[key]) {
          if (!queryBuilder.getQuery().includes(key)) {
            queryBuilder.leftJoinAndSelect(`${repository.metadata.name}.${key}`, key);
          }
          queryBuilder.andWhere(`${key}.id = :${key}Id`, { [`${key}Id`]: joinTableFilters[key] });
        }
      });
    }
  
    // Filtros dinámicos
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          queryBuilder.andWhere(`${key} = :${key}`, { [key]: filters[key] });
        }
      });
    }
  
    // Búsqueda
    if (search) {
      const searchTerm = `%${search.toLowerCase()}%`;
      const columns = ['name', 'description', 'title', 'content'];
      const conditions: string[] = [];
  
      // metadata de la entidad para verificar las columnas existentes
      const entityMetadata = repository.metadata;
  
      columns.forEach((column) => {
        if (entityMetadata.columns.some(c => c.propertyName === column)) {
          conditions.push(`LOWER(${column}) LIKE :search`);
        }
      });
  
      if (conditions.length > 0) {
        queryBuilder.andWhere(conditions.join(' OR '), { search: searchTerm });
      }
    }
  
    // Ordenación
    if (sortField) {
      console.log('SORTFIELD: ', sortField);
  
      const alias = relations && relations.length > 0
        ? relations[0].split('.').pop() 
        : repository.metadata.name; 
  
      const fieldToSort = relations && relations.length > 0 && sortField.includes('.')
        ? sortField
        : `${repository.metadata.name}.${sortField}`;
  
      queryBuilder.orderBy(fieldToSort, sortOrder || 'DESC');
    }
  
    // Paginación
    queryBuilder.skip((page - 1) * limit).take(limit);
  
    const [data, total] = await queryBuilder.getManyAndCount();
    console.log('data: ', data);
  
    return { data, total };
  }
  
}  