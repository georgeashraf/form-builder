import { Button, DataTableRowActions, Modal } from '@engine/design-system';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import RequestForm from './RequestForm';
import { RequestTableColumns } from './RequestTableColumn';

const RequestListing = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
                <Link
                  to={`${row.getValue('key')}/edit`}
                  className="py-2 px-6 cursor-pointer transition-colors hover:bg-base-200"
                >
                  Edit
                </Link>
              </DataTableRowActions>
            ),
          },
        ]}
      />
    </>
  );
};

export default RequestListing;
