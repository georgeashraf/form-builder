import type {
    ColumnFiltersState,
    PaginationState,
  } from '@tanstack/react-table';

export interface IOptions {
    filter: ColumnFiltersState,
    paging: PaginationState
  }