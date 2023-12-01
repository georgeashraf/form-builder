import { Table } from '@tanstack/react-table';
import { DataTableFilter } from './data-table-filter';
import { Button } from '.././button';
import { DataTableViewOptions } from './data-table-view-options';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tableMapping?: any[];
}

export function DataTableToolbar<TData>({
  table,
  tableMapping,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {tableMapping &&
          tableMapping.map(
            (mapping, idx) =>
              table.getColumn(mapping.elementName) &&
              mapping.enableFiltering && (
                <DataTableFilter
                  key={idx}
                  column={table.getColumn(mapping.elementName)}
                  title={mapping.elementLabel}
                  options={mapping.filter.values}
                  optionsResource={mapping.filter.resource}
                  optionsCondition={mapping.filter.condition}
                />
              )
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <EnvelopeClosedIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} tableMapping={tableMapping} />
    </div>
  );
}
