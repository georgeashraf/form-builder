import { Button, Modal } from '@engine/design-system';
import { useState } from 'react';
import RequestForm from './RequestForm';

const RequestListing = () => {
  const [modalShow, setModalShow] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const onClose = () => {
    setModalShow(false);
    setRefetch(!refetch);
  };

  return (
    <>
      <Modal
        trigger={<Button type="submit">Add</Button>}
        title="Create a new request"
        description=""
      >
        <RequestForm />
      </Modal>
    </>
  );
};

export default RequestListing;
