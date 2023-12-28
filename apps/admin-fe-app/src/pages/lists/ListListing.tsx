import {
  Button,
  DataTableRowActions,
  DropdownMenuItem,
  Modal,
} from '@engine/design-system';
import { ListQueryType } from '@engine/shared-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { listLists } from './api';
import ListForm from './ListForm';
import { ListTableColumns } from './ListTableColumn';

const ListListing = () => {
  const [open, setOpen] = useState(false);
  const ListListingParams: ListQueryType = {
    // pagination: { limit: 2, offset: 1 },
    selects: ['key', 'value', 'label', 'group', 'jsonValue'],
    includes: [''],
    // filters: { key: { op: '$eq', value: 'key' } },
  };
  return (
    <div className="mt-20 mx-4 w-full md:w-[100%]  min-h-[45%]">
      <Modal
        trigger={<Button type="submit">Add</Button>}
        title="Create a new List"
        description=""
      >
        <ListForm setOpen={setOpen} />
      </Modal>
      <DataTable
        columns={[
          ...ListTableColumns,
          {
            id: '#rowActions',
            cell: ({ row }) => (
              <DataTableRowActions>
                <div className="flex flex-col">
                  <DropdownMenuItem className="border-b-2">
                    <Link
                      to={`${row.getValue('key')}/edit`}
                      className="cursor-pointer transition-colors hover:bg-base-200"
                    >
                      Edit
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DataTableRowActions>
            ),
          },
        ]}
        params={ListListingParams}
        listingHandler={listLists}
        queryKey={'listingLists'}
      />
    </div>
  );
};

export default ListListing;
