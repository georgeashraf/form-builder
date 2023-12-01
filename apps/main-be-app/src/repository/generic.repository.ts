import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { AbstractRepository } from './abstract.repository';
import { Pagination, Populate, QueryOptions, WhereClaus } from './types';

export class GenericRepository<Model, ModelColumns, Relations>
  implements AbstractRepository<Model, ModelColumns, Relations>
{
  private _model: string;

  constructor(model: string, @InjectModel() private readonly knex: Knex) {
    this._model = model;
  }
  async findOneOrNull(
    id: string | number,
    options?: QueryOptions<ModelColumns, Relations>
  ): Promise<Model | null> {
    let baseQuery = this.knex<Model>(this._model);
    if (typeof id === 'string') {
      baseQuery.where(`${this._model}.key`, id);
    } else if (typeof id === 'number') {
      baseQuery.where(`${this._model}.id`, id);
    } else {
      throw new Error(`id can only be a string or number`);
    }
    try {
      const result = await baseQuery.first();
      if (result) return result as Model;
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async list(queryOptions: QueryOptions<ModelColumns, Relations>) {
    let baseQuery = this.knex<Model>(this._model);
    baseQuery = this.parseOptions(baseQuery, queryOptions);
    try {
      const result = await baseQuery;
      if (result) {
        console.log(
          '🚀 ~ file: generic.repository.ts:42 ~ list ~ result:',
          result
        );
        return result;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async create(item: Model): Promise<number[]> {
    const insertObj: { [key: string]: any } = {};
    for (var k in item) {
      if (typeof item[k] === 'object' && item[k] !== null) {
        // stringify json objects
        insertObj[k] = JSON.stringify(item[k]);
      } else {
        insertObj[k] = item[k];
      }
    }
    const result = await this.knex.table(this._model).insert(insertObj);
    return result;
  }
  private parseOptions(
    query: Knex.QueryBuilder,
    options: QueryOptions<ModelColumns, Relations>
  ) {
    if (options.select) query = this.select(query, options.select);
    if (options.where) query = this.filter(query, options.where);
    if (options.populate) query = this.populate(query, options.populate);
    if (options.pagination) query = this.pagination(query, options.pagination);
    console.log(
      '🚀 ~ file: generic.repository.ts:75 ~ query:',
      query.toQuery()
    );
    return query;
  }
  private populate(query: Knex.QueryBuilder, populate: Populate<Relations>[]) {
    if (populate.length > 0) {
      populate.forEach((element) => {
        const tableName = `${element.model} as ${element.as}`;
        const column1 = `${element.as}.${element.foreignKey}`;
        const column2 = `${this._model}.id`;
        if (element.joinType === 'inner') {
          query.innerJoin(tableName, column1, column2);
        }
        if (element.joinType === 'left') {
          query.leftJoin(tableName, column1, column2);
        }
        if (element.joinType === 'right') {
          query.rightJoin(tableName, column1, column2);
        }
      });
    }
    return query;
  }
  private pagination(query: Knex.QueryBuilder, pagination: Pagination) {
    return query.limit(pagination.limit).offset(pagination.offset);
  }
  private select(query: Knex.QueryBuilder, select: ModelColumns[]) {
    return query.select(select.map((s) => `${this._model}.${s}`));
  }
  private filter(query: Knex.QueryBuilder, where: WhereClaus<ModelColumns>) {
    Object.keys(where).forEach((column) => {
      const value = where[column];
      switch (value.op) {
        case '$eq':
          query.where(`${this._model}.${column}`, value.value);
          break;
        case '$ne':
          query.whereNot(`${this._model}.${column}`, value.value);
          break;
        case '$in':
          query.whereIn(`${this._model}.${column}`, value.value);
          break;
        case '$null':
          query.whereNull(`${this._model}.${column}`);
          break;
        case '$notNull':
          query.whereNotNull(`${this._model}.${column}`);
          break;
        default:
          break;
      }
    });
    return query;
  }
  private iterate(obj) {
    Object.keys(obj).forEach((key) => {
      console.log(`key: ${key}, value: ${obj[key]}`);

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.iterate(obj[key]);
      }
    });
  }
}
