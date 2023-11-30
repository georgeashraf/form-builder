import { Button, Modal } from '@engine/design-system';
import { useState } from 'react';
import RequestForm from './RequestForm';

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
    </>
  );
};

export default RequestListing;
