import {
  Button,
  DataTableRowActions,
  DropdownMenuItem,
  Modal,
} from '@engine/design-system';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import RequestForm from './RequestForm';
import { RequestTableColumns } from './RequestTableColumn';

const RequestListing = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-20 mx-4 w-full md:w-[100%]  min-h-[45%]">
      <Modal
        trigger={<Button type="submit">Add</Button>}
        title="Create a new request"
        description=""
        open={open}
        setOpen={setOpen}
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
                      to={`/form-builder`}
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
      />
    </div>
  );
};

export default RequestListing;
