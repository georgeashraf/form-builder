import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifySuccess } from '../../components/Toasts/success';
import axios from 'axios';
import { notifyError } from '../../components/Toasts/error';
import { useGenericMutation } from '../../hooks/useMutation';
import {
  Button,
  cn,
  Input,
  Label,
  Textarea,
} from '@engine/design-system';
import { CreateListSchema, CreateListType, CreateRequestSchema } from '@engine/shared-types';
import { createLists } from './api';

const initialData = {
  group: '',
};

type ListFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ListForm({ setOpen }: ListFormProps) {
  const { handleSubmit, control } = useForm<CreateListType>({
    defaultValues: initialData,
    resolver: zodResolver(CreateListSchema),
  });

  const { isLoading, mutate } = useGenericMutation(createLists, undefined, {
    onSuccess: async (data, variables, context) => {
      notifySuccess('List Created Succesfully');
      setOpen(false);
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
    mutate(data);
  };

  return (
    <form
      className={cn('space-y-6 mx-4', '')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <Label className="mb-2">Group</Label>
        <Controller
          name="group"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                value={field.value}
                placeholder="group"
                className="w-full"
              />
              {fieldState.error?.message && (
                <Label variant={'error'}>{fieldState.error?.message}</Label>
              )}
            </>
          )}
        />
      </div>

      <div className="flex flex-col">
        <Label className="mb-2">Label</Label>
        <Controller
          name="label"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                value={field.value}
                placeholder="Label"
                className="w-full"
              />
              {fieldState.error?.message && (
                <Label variant={'error'}>{fieldState.error?.message}</Label>
              )}
            </>
          )}
        />
      </div>

      <div className="flex flex-col">
        <Label className="mb-2">Value</Label>
        <Controller
          name="value"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                value={field.value}
                placeholder="Value"
                className="w-full"
              />
              {fieldState.error?.message && (
                <Label variant={'error'}>{fieldState.error?.message}</Label>
              )}
            </>
          )}
        />
      </div>
      {/* <div className="flex flex-col">
        <Controller
          name="jsonValue"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Textarea
                {...field}
                value={JSON.stringify(field.value, '', 2)}
                placeholder="Values"
                className="w-full"
                isJson={true}
              />
              {fieldState.error?.message && (
                <Label variant={'error'}>{fieldState.error?.message}</Label>
              )}
            </>
          )}
        />
      </div> */}

      <div className="w-full flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
