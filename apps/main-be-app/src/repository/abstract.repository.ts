import { QueryOptions } from './types';

export abstract class AbstractRepository<Model, ModelColumns, Relations> {
  //   abstract getAll(options: any): Promise<Model[]>;

  abstract findOneOrNull(
    identifier: number | string,
    options?: QueryOptions<ModelColumns, Relations>
  ): Promise<Model | null>;

    abstract create(item: Model): Promise<number[]>;

  //   abstract batchCreate(rows: Model[]): Promise<Model[]>;

  //   abstract update(id: number, item: Model): Promise<number>;

  //   abstract delete(id: number): Promise<number>;

  //   abstract count(options?: QueryOptions<ModelColumns, Relations>): Promise<number>;

  //   abstract rawQuery(query: string): Promise<any>;
}
