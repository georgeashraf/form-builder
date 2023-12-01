import { Table } from '@tanstack/react-table';
import { DataTableFilter } from './data-table-filter';
import { Button } from '.././button';
import { DataTableViewOptions } from './data-table-view-options';
import { Cross1Icon } from '@radix-ui/react-icons';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn('label') && (
          <DataTableFilter
            column={table.getColumn('label')!}
            title={'label'}
            options={[
              { label: 'l', value: 'k' },
              { label: 'j', value: 'j' },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross1Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
