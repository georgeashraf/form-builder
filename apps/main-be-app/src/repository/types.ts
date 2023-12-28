export type QueryOptions<ModelColumns, Relations> = {
  where?: WhereClaus<ModelColumns>;
  select?: ModelColumns[];
  populate?: Populate[];
  sort?: Sort<ModelColumns>;
  pagination?: Pagination;
};

export type Pagination = {
  limit: number;
  offset: number;
};

export type WhereClaus<ModelColumns> = {
  [key in ModelColumns as string]: { op: Operator; value: any };
};

export type Populate = {
  model: string;
  as: string;
  joinType: JoinType;
  foreignKey: string;
  attributes: string[];
  hasMany: boolean;
};

export interface Sort<ModelColumns> {
  column: ModelColumns;
  value: 'desc' | 'asc';
}

type JoinType = 'inner' | 'left' | 'right';

type Operator =
  | '$and'
  | '$or'
  | '$not'
  | '$eq'
  | '$ne'
  | '$in'
  | '$lt'
  | '$lte'
  | '$gt'
  | '$gte'
  | '$between'
  | '$null'
  | '$notNull';
