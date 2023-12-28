import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifySuccess } from '../../components/Toasts/success';
import axios from 'axios';
import { notifyError } from '../../components/Toasts/error';
import { useGenericMutation } from '../../hooks/useMutation';
import { Button, Checkbox, cn, Input, Label } from '@engine/design-system';
import { CreateFormModelType, CreateFormSchema } from '@engine/shared-types';
import { createForm } from './api';
import useDesigner from '../../components/FormBuilder/Hooks/useDesigner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FormPreview from '../../components/FormBuilder/FormPreview';

export default function FormSubmitionForm({
  requestkey,
}: {
  requestkey: string;
}) {
  const { dataSchema, uiSchema } = useDesigner();

  const initialData = {
    name: '',
    creator: 'fdd0452e-6d89-4115-8a51-223db23ea313',
    isPublished: false,
    requestKey: requestkey,
    uiSchema,
    dataSchema,
  };
  const navigate = useNavigate();

  const { handleSubmit, control, setValue } = useForm<CreateFormModelType>({
    defaultValues: initialData,
    resolver: zodResolver(CreateFormSchema),
  });
  useEffect(() => {
    setValue('uiSchema', uiSchema);
    setValue('dataSchema', dataSchema);
  }, [uiSchema, dataSchema]);
  const { isLoading, mutate } = useGenericMutation(createForm, undefined, {
    onSuccess: async (data, variables, context) => {
      notifySuccess('Form Created Succesfully');
    },
    onError: (err: any) => {
      if (axios.isAxiosError(err)) {
        notifyError(JSON.stringify(err.response?.data?.message));
      } else {
        notifyError('Something Went Wrong');
      }
    },
  });
  const onSubmit = (data: CreateFormModelType) => {
    data.requestKey = requestkey;
    mutate(data);
  };

  return (
    <form
      className={cn('flex justify-between gap-4 mb-3')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full">
        <Label className="mb-2">Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                value={field.value}
                placeholder="Name"
                className="w-full"
              />
              {fieldState.error?.message && (
                <Label variant={'error'}>{fieldState.error?.message}</Label>
              )}
            </>
          )}
        />
      </div>
      <div className="flex flex-col items-center">
        <Label className="mb-2">Published</Label>
        <Controller
          name="isPublished"
          control={control}
          render={({ field, fieldState }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      <div className="flex justify-end gap-3 items-center">
        <Button type="submit">Save</Button>
        <FormPreview trigger={<Button type="submit">Preview</Button>} />
      </div>
    </form>
  );
}
