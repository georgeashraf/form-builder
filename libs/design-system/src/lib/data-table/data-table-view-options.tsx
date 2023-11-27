import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { SliderIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '.././button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '../DropDownMenu';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  tableMapping?: any[];
}

export function DataTableViewOptions<TData>({
  table,
  tableMapping,
}: DataTableViewOptionsProps<TData>) {
  const resolveColumnLabel = (name: string) => {
    const col = tableMapping?.find((e) => e.elementName === name);
    return col?.elementLabel || name;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <SliderIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Show/Hide columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {resolveColumnLabel(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
