import { ListModelType } from '@engine/shared-types';
import { ColumnDef } from '@tanstack/react-table';
import { Click2Copy } from '../../components/Click2Copy';

export const ListTableColumns: ColumnDef<ListModelType>[] = [
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
    id: 'group',
    accessorFn: (row) => `${row.group}`,
    header: 'Group',
    cell: ({ row }) => (
      <div className="w-[80px]">
        <div className="flex items-center">
          <Click2Copy text={row.getValue('group')} />
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
    id: 'value',
    accessorFn: (row) => `${row.value}`,
    header: 'Value',
    cell: ({ row }) => (
      <div className="w-[80px]">
        <div className="flex items-center">
          <span>{row.getValue('value')}</span>
        </div>
      </div>
    ),
    enableHiding: true,
  },
//   {
//     id: 'jsonValue',
//     accessorKey: 'jsonValue',
//     header: 'Values',
//     cell: ({ row }) => {
//       const values = row.getValue('jsonValue') as any[];
//       if (!values.length) {
//         return <p className="text-gray-500 dark:text-gray-400">No Forms yet</p>;
//       }
//       return <div className="flex flex-col">{values}</div>;
//     },
//     enableHiding: true,
//   },
];
