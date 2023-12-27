import { DatePicker, DateRangePicker, Input, Label, Switch } from '@engine/design-system';
import { UISchema, SchemaProperty } from '@engine/shared-types';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Controller, useForm } from 'react-hook-form';
import useDesigner from '../Hooks/useDesigner';
import {
  FormElement,
  FormElementInstance,
} from '../types';

export const DateRangeFieldFormElement: FormElement = {
  type: 'DateRangeField',
  construct: (key: string) => ({
    key,
    type: 'Input',
    subtype: 'DateRangeField',
    dataSchema: {
      [key]: {
        key,
        type: 'string',
        pattern: '',
        description: 'This is Element Description',
        errorMessage: { type: 'foo must be an Integer' },
      },
    },
    uiSchema: {
      key,
      type: 'Control',
      required: true,
      name: key,
      variant: 'DateRange',
      label: '',
      placeholder: 'Input Placeholder',
      scope: `#/properties/${key}`,
    },
  }),
  designerBtnElement: {
    icon: CalendarIcon,
    label: 'Date Range field',
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
      <Label variant={'base'}>
        {elementInstance.uiSchema.label}
        <span className="text-error">
          {elementInstance.uiSchema.required && '*'}
        </span>
      </Label>
      <DateRangePicker />
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
  const elementKey = elementInstance.uiSchema.key;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {elementInstance.uiSchema.label}
        <span className="text-error">
          {elementInstance.uiSchema.required && '*'}
        </span>
      </Label>
      <DateRangePicker />
      {elementInstance.dataSchema &&
        elementInstance.dataSchema[elementKey]?.description && (
          <p className="text-base-100 text-[0.8rem]">
            {elementInstance.dataSchema[elementKey]?.description}
          </p>
        )}
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
    const oldName = scopeArr?.pop();
    let newScope;
    if (scopeArr) {
      scopeArr.push(newName);
      newScope = scopeArr.join('/');
    }

    values.uiSchema.scope = newScope;
    if (newName !== oldName) {
      delete Object.assign(values.dataSchema, {
        [newName]: values.dataSchema[oldName!],
      })[oldName!];
    }

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
      <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
        <Label className="mb-2">Required</Label>
        <Controller
          name={`uiSchema.required`}
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Switch
                className=""
                checked={field.value}
                onCheckedChange={field.onChange}
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
