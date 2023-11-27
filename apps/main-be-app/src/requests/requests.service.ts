import {
  CreateRequest,
  RequestColumns,
  RequestIncludes,
  RequestModel,
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
export class RequestsService {
  private _requestRepository: GenericRepository<
    RequestModel,
    RequestColumns,
    RequestIncludes
  >;
  // TODO: Inject Repository
  constructor(@InjectModel() private readonly knex: Knex) {
    this._requestRepository = new GenericRepository<
      RequestModel,
      RequestColumns,
      RequestIncludes
    >('Request', this.knex);
  }
  async create(createRequest: CreateRequest) {
    try {
      const data = await this._requestRepository.create(createRequest);
      return { data };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Request with same Name already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string | number) {
    if (!id) {
      throw new NotFoundException(`Request does not exist`);
    }
    const data = await this._requestRepository.findOneOrNull(id);
    return { data };
  }
}
