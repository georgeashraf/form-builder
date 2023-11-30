import { z } from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifySuccess } from '../../components/Toasts/success';
import axios from 'axios';
import { notifyError } from '../../components/Toasts/error';
import { createRequests } from './api';
import { useGenericMutation } from '../../hooks/useMutation';
import { Button, cn, Input } from '@engine/design-system';
import { CreateRequestSchema, CreateRequestType } from '@engine/shared-types';

const initialData = {
  label: '',
  name: '',
  description: '',
  creator: '',
  isPublished: false,
};

export default function RequestForm() {
  const { handleSubmit, control } = useForm<CreateRequestType>({
    defaultValues: initialData,
    resolver: zodResolver(CreateRequestSchema),
  });

  const { isLoading, mutate } = useGenericMutation(createRequests, undefined, {
    onSuccess: async (data, variables, context) => {
      notifySuccess('Request Created Succesfully');
    },
    onError: (err: any) => {
      if (axios.isAxiosError(err)) {
        notifyError(JSON.stringify(err.response?.data?.message));
      } else {
        notifyError('Something Went Wrong');
      }
    },
  });
  const onSubmit = (data: any) => {
    console.log('🚀 ~ file: RequestForm.tsx:37 ~ onSubmit ~ data:', data);
    // mutate(data);
  };

  return (
    <form
      className={cn('space-y-6 mx-4', '')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="label"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value}
            // error={fieldState.error?.message}
            placeholder="Label"
            className="w-full"
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value}
            // error={fieldState.error?.message}
            placeholder="Name"
            className="w-full"
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value}
            // error={fieldState.error?.message}
            placeholder="Description"
            className="w-full"
          />
        )}
      />

      <div className="w-full flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
