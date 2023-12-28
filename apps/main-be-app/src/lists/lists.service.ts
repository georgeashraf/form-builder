import {
  CreateListType,
  ListColumnsType,
  ListModelType,
  ListQueryType,
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
export class ListsService {
  private _listRepository: GenericRepository<
    ListModelType,
    ListColumnsType,
    ''
  >;
  // TODO: Inject Repository
  constructor(@InjectModel() private readonly knex: Knex) {
    this._listRepository = new GenericRepository<
      ListModelType,
      ListColumnsType,
      ''
    >('list', this.knex);
  }

  async list(query: ListQueryType) {
    try {
      const queryOptions = this.parseQueryOptions(query);
      const data = await this._listRepository.list(queryOptions);
      return { data };
    } catch (error) {
      throw new BadRequestException(`Couldn't find Lists`);
    }
  }


  async create(createListModel: CreateListType) {
    try {
      const data = await this._listRepository.create(createListModel);
      return { data };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'List Item with same data already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string | number) {
    if (!id) {
      throw new NotFoundException(`List Item does not exist`);
    }
    const data = await this._listRepository.findOneOrNull(id);
    return { data };
  }

  parseQueryOptions(query: ListQueryType) {
    let queryOptions: QueryOptions<ListColumnsType, ''> = {};
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
      queryOptions.populate = populate;
    }
    return queryOptions;
  }
}
