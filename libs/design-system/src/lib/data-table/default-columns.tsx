import { PersonIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';

export const defaultColumns = new Map<string, ColumnDef<any>>([
  [
    'id',
    {
      accessorKey: 'id',
      accessorFn: (row) => `${row.id}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created By" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">
          <div className="flex items-center">
            <PersonIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{row.getValue('creator')}</span>
          </div>
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ],
]);
