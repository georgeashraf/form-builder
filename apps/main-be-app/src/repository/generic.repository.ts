import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { AbstractRepository } from './abstract.repository';
import { Pagination, Populate, QueryOptions, WhereClaus } from './types';

export class GenericRepository<Model, ModelColumns, Relations>
  implements AbstractRepository<Model, ModelColumns, Relations>
{
  private _tableName: string;
  private UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  constructor(tableName: string, @InjectModel() private readonly knex: Knex) {
    this._tableName = tableName;
  }

  async findOneOrNull(
    id: string | number,
    options?: QueryOptions<ModelColumns, Relations>
  ): Promise<Model | null> {
    let baseQuery = this.knex<Model>(this._tableName);
    if (typeof id === 'string') {
      baseQuery.where(`${this._tableName}.key`, id);
    } else if (typeof id === 'number') {
      baseQuery.where(`${this._tableName}.id`, id);
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
    let baseQuery = this.knex<Model>(this._tableName);
    baseQuery = this.parseOptions(baseQuery, queryOptions);
    try {
      const result = await baseQuery;
      if (result) {
        const transformedData = this.transformData(result, queryOptions);
        return transformedData;
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
      } else if (typeof item[k] === 'string') {
        // TODO: Handle id resolution from uuiD to handle relations on insertion
        // let key = k;
        // let value = item[k];
        // if (this.UUID_REGEX.test(item[k] as any)) {

        // }
        insertObj[k] = item[k];
      } else {
        insertObj[k] = item[k];
      }
    }
    const result = await this.knex.table(this._tableName).insert(insertObj);
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
  private populate(query: Knex.QueryBuilder, populate: Populate[]) {
    if (populate.length > 0) {
      populate.forEach((element) => {
        const tableName = `${element.model} as ${element.as}`;
        const column1 = `${element.as}.${element.foreignKey}`;
        const column2 = `${this._tableName}.id`;
        if (element.joinType === 'inner') {
          query.innerJoin(tableName, column1, column2);
        }
        if (element.joinType === 'left') {
          query.leftJoin(tableName, column1, column2);
        }
        if (element.joinType === 'right') {
          query.rightJoin(tableName, column1, column2);
        }
        query.select(
          element.attributes.map(
            (e) => `${element.as}.${e} as ${element.as}.${e}`
          )
        );
      });
    }
    return query;
  }
  private pagination(query: Knex.QueryBuilder, pagination: Pagination) {
    return query.limit(pagination.limit).offset(pagination.offset);
  }
  private select(query: Knex.QueryBuilder, select: ModelColumns[]) {
    return query.select(select.map((s) => `${this._tableName}.${s}`));
  }
  private filter(query: Knex.QueryBuilder, where: WhereClaus<ModelColumns>) {
    Object.keys(where).forEach((column) => {
      const value = where[column];
      switch (value.op) {
        case '$eq':
          query.where(`${this._tableName}.${column}`, value.value);
          break;
        case '$ne':
          query.whereNot(`${this._tableName}.${column}`, value.value);
          break;
        case '$in':
          query.whereIn(`${this._tableName}.${column}`, value.value);
          break;
        case '$null':
          query.whereNull(`${this._tableName}.${column}`);
          break;
        case '$notNull':
          query.whereNotNull(`${this._tableName}.${column}`);
          break;
        default:
          break;
      }
    });
    return query;
  }
  private iterateNestedObj(obj) {
    Object.keys(obj).forEach((key) => {
      console.log(`key: ${key}, value: ${obj[key]}`);

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.iterateNestedObj(obj[key]);
      }
    });
  }
  private transformData(
    data: any[],
    queryOptions: QueryOptions<ModelColumns, Relations>
  ) {
    let records = new Map<string, any>();
    let foreignKeysMap = new Map<string, { hasMany: boolean }>();
    queryOptions.populate.forEach((e) =>
      foreignKeysMap.set(e.as, { hasMany: e.hasMany })
    );

    data.forEach((record) => {
      let recordMap = new Map<string, any>();
      for (const key in record) {
        // populated property
        if (key.includes('.')) {
          const populatedModel = key.split('.')[0];
          const populatedModelProperty = key.split('.')[1];
          const foreignKeyEntry = foreignKeysMap.get(populatedModel);
          const entry = recordMap.get(populatedModel);
          if (entry) {
            foreignKeyEntry.hasMany
              ? recordMap.set(populatedModel, [
                  { ...entry[0], [populatedModelProperty]: record[key] },
                ])
              : recordMap.set(populatedModel, {
                  ...entry,
                  [populatedModelProperty]: record[key],
                });
            // entry[key.split('.')[1]] = record[key];
          } else {
            foreignKeyEntry.hasMany
              ? recordMap.set(populatedModel, [
                  {
                    [key.split('.')[1]]: record[key],
                  },
                ])
              : recordMap.set(populatedModel, {
                  [key.split('.')[1]]: record[key],
                });
          }
        } else {
          // original model property
          recordMap.set(key, record[key]);
        }
      }
      if (records.has(record['key'])) {
        // merge many2many objects
        const mergedResult = this.mergeProperties(
          Object.fromEntries(recordMap),
          records.get(record['key'])
        );
        records.set(record['key'], mergedResult);
      } else {
        records.set(record['key'], Object.fromEntries(recordMap));
      }
    });
    return Array.from(records.values());
  }

  private mergeProperties(obj1: any, obj2: any) {
    let result;
    for (const p in obj1) {
      if (obj2.hasOwnProperty(p) && Array.isArray(obj1[p])) {
        result = { ...obj1, [p]: [...obj1[p as any], ...obj2[p as any]] };
      }
    }
    return result ?? obj1;
  }
}
