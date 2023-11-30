import {
  CreateFormModelType,
  FormColumnsType,
  FormIncludesType,
  FormModelType,
} from '@engine/shared-types';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { GenericRepository } from '../repository/generic.repository';

@Injectable()
export class FormsService {
  private _formRepository: GenericRepository<
    FormModelType,
    FormColumnsType,
    FormIncludesType
  >;
  // TODO: Inject Repository
  constructor(@InjectModel() private readonly knex: Knex) {
    this._formRepository = new GenericRepository<
      FormModelType,
      FormColumnsType,
      FormIncludesType
    >('form', this.knex);
  }
  async create(createFormModel: CreateFormModelType) {
    try {
      const data = await this._formRepository.create(createFormModel);
      return { data };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Form with same Name already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string | number) {
    if (!id) {
      throw new NotFoundException(`Form does not exist`);
    }
    const data = await this._formRepository.findOneOrNull(id);
    return { data };
  }
}
