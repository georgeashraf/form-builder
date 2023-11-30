import { Button, Modal } from '@engine/design-system';
import RequestForm from './RequestForm';

const RequestListing = () => {

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
