import { Input, Label } from '@engine/design-system';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import useDesigner from '../Hooks/useDesigner';
import {
  FormElement,
  FormElementInstance,
  SchemaProperty,
  UISchema,
} from '../types';

export const TextFieldFormElement: FormElement = {
  type: 'TextField',
  construct: (key: string) => ({
    key,
    type: 'Input',
    subtype: 'TextField',
    dataSchema: {
      [key]: {
        key,
        type: 'string',
        pattern: '',
        description: 'This is Element Description',
        nullable: true,
        maxLength: 255,
        minLength: 1,
        errorMessage: { type: 'foo must be an Integer' },
      },
    },
    uiSchema: {
      key,
      type: 'Control',
      name: key,
      label: '',
      placeholder: 'Input Placeholder',
      scope: `#/properties/${key}`,
    },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Text  filed',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const elementKey = elementInstance.uiSchema.key;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label variant={'base'}>{elementInstance.uiSchema.label}</Label>
      <Input
        readOnly
        disabled
        placeholder={elementInstance.uiSchema.placeholder}
      />
      {elementInstance.dataSchema &&
        elementInstance.dataSchema[elementKey]?.description && (
          <p className="text-base-100 text-[0.8rem]">
            {elementInstance.dataSchema[elementKey]?.description}
          </p>
        )}
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {elementInstance.uiSchema.label}
        {/* {elementInstance.required && '*'} */}
      </Label>
      <Input placeholder={elementInstance.uiSchema.placeholder} />
      {/* {elementInstance.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {elementInstance.helperText}
        </p>
      )} */}
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElementSchemas } = useDesigner();
  const form = useForm<any>({
    // resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      dataSchema: elementInstance.dataSchema,
      uiSchema: elementInstance.uiSchema,
    },
  });
  function updateSchemas(values: {
    uiSchema: UISchema;
    dataSchema: SchemaProperty;
  }) {
    const newName = values.uiSchema.name;
    const oldScope = values.uiSchema.scope;
    const scopeArr = oldScope?.split('/');
    const oldName = scopeArr?.pop()
    let newScope;
    if (scopeArr) {
      scopeArr.push(newName);
      newScope = scopeArr.join('/');
    }

    values.uiSchema.scope = newScope;
    delete Object.assign(values.dataSchema, { [newName]: values.dataSchema[oldName!] })[oldName!];
    updateElementSchemas({
      ...elementInstance,
      uiSchema: values.uiSchema,
      dataSchema: values.dataSchema,
    });
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onBlur={form.handleSubmit(updateSchemas)}
      className="space-y-3"
    >
      <div className="flex flex-col">
        <Label className="mb-2">Label</Label>
        <Controller
          name={`uiSchema.label`}
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                }}
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
        <Label className="mb-2">name</Label>
        <Controller
          name="uiSchema.name"
          control={form.control}
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

      <div className="flex flex-col">
        <Label className="mb-2">Description</Label>
        <Controller
          name={`dataSchema[${elementInstance.key}].description`}
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                value={field.value}
                placeholder="Description"
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
        <Label className="mb-2">placeholder</Label>
        <Controller
          name={`uiSchema.placeholder`}
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                value={field.value}
                placeholder="Placeholder"
                className="w-full"
              />
              {fieldState.error?.message && (
                <Label variant={'error'}>{fieldState.error?.message}</Label>
              )}
            </>
          )}
        />
      </div>
    </form>
  );
}
