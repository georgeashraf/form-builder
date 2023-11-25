export type QueryOptions<ModelColumns, Relations> = {
  where?: WhereClaus<ModelColumns>;
  select?: ModelColumns[];
  populate?: Populate<Relations>[];
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

export type Populate<Relations> = {
  model: string;
  as: Relations;
  joinType: JoinType;
  foreignKey: string;
  returning?: string[];
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
