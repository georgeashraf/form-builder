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
import { RequestsService } from '../requests/requests.service';

@Injectable()
export class FormsService {
  private _formRepository: GenericRepository<
    FormModelType,
    FormColumnsType,
    FormIncludesType
  >;
  // TODO: Inject Repository
  constructor(
    @InjectModel() private readonly knex: Knex,
    private readonly requestsService: RequestsService
  ) {
    this._formRepository = new GenericRepository<
      FormModelType,
      FormColumnsType,
      FormIncludesType
    >('form', this.knex);
  }
  async create(createFormModel: CreateFormModelType) {
    try {
      const { requestKey, ...rest } = createFormModel;
      const request = await this.requestsService.findOne(requestKey);
      const data = await this._formRepository.create({
        ...rest,
        requestId: request.data.id,
      });
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
