import {
  Button,
  DataTableRowActions,
  DropdownMenuItem,
  Modal,
} from '@engine/design-system';
import { RequestQueryType } from '@engine/shared-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { listRequests } from './api';
import RequestForm from './RequestForm';
import { RequestTableColumns } from './RequestTableColumn';

const RequestListing = () => {
  const [open, setOpen] = useState(false);
  const RequestListingParams: RequestQueryType = {
    // pagination: { limit: 2, offset: 1 },
    selects: [
      'key',
      'creator',
      'description',
      'key',
      'label',
      'name',
      'isPublished',
    ],
    includes: ['forms'],
    // filters: { key: { op: '$eq', value: 'key' } },
  };
  return (
    <div className="mt-20 mx-4 w-full md:w-[100%]  min-h-[45%]">
      <Modal
        trigger={<Button type="submit">Add</Button>}
        title="Create a new request"
        description=""
      >
        <RequestForm setOpen={setOpen} />
      </Modal>
      <DataTable
        columns={[
          ...RequestTableColumns,
          {
            id: '#rowActions',
            cell: ({ row }) => (
              <DataTableRowActions>
                <div className="flex flex-col">
                  <DropdownMenuItem>
                    <Link
                      to={`${row.getValue('key')}/edit`}
                      className="py-2 px-6 cursor-pointer transition-colors hover:bg-base-200"
                    >
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to={`${row.getValue('key')}/form-builder`}
                      className="py-2 px-6 cursor-pointer transition-colors hover:bg-base-200"
                    >
                      Add Form
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DataTableRowActions>
            ),
          },
        ]}
        params={RequestListingParams}
        listingHandler={listRequests}
        queryKey={'listingRequests'}
      />
    </div>
  );
};

export default RequestListing;
