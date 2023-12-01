import { Button, Modal } from '@engine/design-system';
import { RequestQueryType } from '@engine/shared-types';
import { useState } from 'react';
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
      <DataTable columns={RequestTableColumns} />
    </>
  );
};

export default RequestListing;
