import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { GenericRepository } from '../repository/generic.repository';
import {
  CreateFormModel,
  FormColumns,
  FormIncludes,
  FormModel,
} from './forms.schema';

@Injectable()
export class FormsService {
  private _formRepository: GenericRepository<
    FormModel,
    FormColumns,
    FormIncludes
  >;
  // TODO: Inject Repository
  constructor(@InjectModel() private readonly knex: Knex) {
    this._formRepository = new GenericRepository<
      FormModel,
      FormColumns,
      FormIncludes
    >('form', this.knex);
  }
  async create(createFormModel: CreateFormModel) {
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
