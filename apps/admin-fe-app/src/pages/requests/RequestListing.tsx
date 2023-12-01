import { Button, Modal } from '@engine/design-system';
import { RequestQueryType } from '@engine/shared-types';
import { useState } from 'react';
import { useGenericQuery } from '../../hooks/useQuery';
import { listRequests } from './api';
import RequestForm from './RequestForm';

const RequestListing = () => {
  const RequestListingParams: RequestQueryType = {
    // pagination: { limit: 2, offset: 1 },
    selects: ['key', 'creator', 'description', 'key'],
    includes: ['forms'],
    // filters: { key: { op: '$eq', value: 'key' } },
  };
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGenericQuery(
    () => listRequests(RequestListingParams),
    'getRequests',
    {}
  );
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
