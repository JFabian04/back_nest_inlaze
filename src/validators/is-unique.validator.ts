import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entity, property] = args.constraints;
    console.log(this.dataSource);
    
    const repository = this.dataSource.getRepository(entity);

    const record = await repository.findOne({ where: { [property]: value } });
    if (record) {
      throw new BadRequestException(`${property} ya está en uso`);
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const [entity, property] = args.constraints;
    return `${property} ya está en uso en ${entity}`;
  }
}
