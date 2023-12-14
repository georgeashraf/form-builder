import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifySuccess } from '../../components/Toasts/success';
import axios from 'axios';
import { notifyError } from '../../components/Toasts/error';
import { useGenericMutation } from '../../hooks/useMutation';
import {
  Button,
  Checkbox,
  cn,
  Input,
  Label,
  Textarea,
} from '@engine/design-system';
import { CreateRequestSchema, CreateRequestType } from '@engine/shared-types';
import { createRequests } from '../../pages/requests/api';
import { ChangeEvent, FormEvent } from 'react';

const initialData = {
  label: '',
  name: '',
  description: '',
  creator: 'fdd0452e-6d89-4115-8a51-223db23ea313',
  isPublished: false,
};

export default function FormSubmitionForm() {
  const { handleSubmit, control } = useForm<CreateRequestType>({
    defaultValues: initialData,
    resolver: zodResolver(CreateRequestSchema),
  });
  // watch all elements => update store
  //   const handleChange = (data: React.FormEvent<HTMLInputElement>) => {
  //     console.log("🚀 ~ file: FormSubmitionForm.tsx:33 ~ onSubmit ~ data:", data.target.name)
  //     // mutate(data);
  //   };

  return (
    <form
      className={cn(
        'flex flex-row justify-between border-b-2 pb-4 pt-2 gap-3 items-center'
      )}
      //   onSubmit={handleSubmit(onSubmit)}
      //   onChange={onSubmit}
    >
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
        <Label className="mb-2">Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                value={field.value}
                // error={fieldState.error?.message}
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
      <div className="flex flex-col">
        <Label className="mb-2">Published</Label>
        <Controller
          name="isPublished"
          control={control}
          render={({ field, fieldState }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
    </form>
  );
}
