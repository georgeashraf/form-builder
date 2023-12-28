import {
  CreateRequestType,
  RequestColumns,
  RequestIncludes,
  RequestModel,
  RequestQueryType,
  requestRelationsMap,
} from '@engine/shared-types';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { GenericRepository } from '../repository/generic.repository';
import { QueryOptions } from '../repository/types';

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
  async create(createRequest: CreateRequestType) {
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

  async list(query: RequestQueryType) {
    try {
      const queryOptions = this.parseQueryOptions(query);
      const data = await this._requestRepository.list(queryOptions);
      return { data };
    } catch (error) {
      throw new BadRequestException(`Couldn't find Requests`);
    }
  }

  async findOne(id: string | number) {
    if (!id) {
      throw new NotFoundException(`Request does not exist`);
    }
    const data = await this._requestRepository.findOneOrNull(id);
    return { data };
  }
  parseQueryOptions(query: RequestQueryType) {
    let queryOptions: QueryOptions<RequestColumns, RequestIncludes> = {};
    if (
      query.pagination?.limit !== undefined &&
      query.pagination?.offset !== undefined
    ) {
      //@ts-ignore
      queryOptions.pagination = query.pagination;
    }
    if (query.selects) {
      queryOptions.select = query.selects;
    }
    if (query.filters) {
      // @ts-ignore
      queryOptions.where = query.filters;
    }
    if (query.includes) {
      let populate = [];
      populate.push({
        attributes: ['key', 'name', 'dataSchema', 'uiSchema'],
        model: 'form',
        as: 'forms',
        joinType: 'left',
        foreignKey: 'requestId',
        hasMany: true,
      });
      queryOptions.populate = populate;
    }
    return queryOptions;
  }
}
