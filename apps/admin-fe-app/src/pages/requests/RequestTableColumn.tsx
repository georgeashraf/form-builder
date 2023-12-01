import { RequestModel } from '@engine/shared-types';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { Click2Copy } from '../../components/Click2Copy';

export const RequestTableColumns: ColumnDef<RequestModel>[] = [
  {
    id: 'key',
    accessorFn: (row) => `${row.key}`,
    header: 'Key',
    cell: ({ row }) => (
      <div className="w-[80px]">
        <div className="flex items-center">
          <Click2Copy text={row.getValue('key')} />
        </div>
      </div>
    ),
    enableHiding: true,
  },
  {
    id: 'label',
    accessorFn: (row) => `${row.label}`,
    header: 'Label',
    cell: ({ row }) => (
      <div className="w-[80px]">
        <div className="flex items-center">
          <span>{row.getValue('label')}</span>
        </div>
      </div>
    ),
    enableHiding: true,
  },
  {
    id: 'name',
    accessorFn: (row) => `${row.name}`,
    header: 'Name',
    cell: ({ row }) => (
      <div className="w-[80px]">
        <div className="flex items-center">
          <span>{row.getValue('name')}</span>
        </div>
      </div>
    ),
    enableHiding: true,
  },
  {
    id: 'isPublished',
    accessorFn: (row) => `${row.isPublished}`,
    header: 'Published',
    cell: ({ row }) => (
      <div className="w-[80px]">
        <div className="flex items-center">
          <span>
            {row.getValue('isPublished') === true ? (
              <CheckIcon />
            ) : (
              <Cross2Icon />
            )}
          </span>
        </div>
      </div>
    ),
    enableHiding: true,
  },
];
