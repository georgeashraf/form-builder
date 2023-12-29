import {
  Button,
  FormSelect,
  Input,
  Label,
  Switch,
} from '@engine/design-system';
import { UISchema, SchemaProperty } from '@engine/shared-types';
import {
  ArrowDownIcon,
  MinusCircledIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import useDesigner from '../Hooks/useDesigner';
import { FormElement, FormElementInstance } from '../types';

export const MultiSelectFieldFormElement: FormElement = {
  type: 'MultiSelectField',
  construct: (key: string) => ({
    key,
    type: 'Input',
    subtype: 'MultiSelectField',
    dataSchema: {
      [key]: { 
        key,
        type: 'array',
        description: 'This element description',
        anyOf: [{ const: 'option1', title: 'Option1' }] ,
        uniqueItems: true,
        errorMessage: { type: 'foo must be an Integer' },
      },
    },
    uiSchema: {
      key,
      type: 'Control',
      required: true,
      name: key,
      variant: 'MultiSelect',
      label: '',
      placeholder: 'Input Placeholder',
      scope: `#/properties/${key}`,
    },
  }),
  designerBtnElement: {
    icon: ArrowDownIcon,
    label: 'Multi-Dropdown Field',
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
      <FormSelect isMulti placeholder={elementInstance.uiSchema.placeholder} />
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
      <FormSelect
        isMulti
        options={
          elementInstance.dataSchema
            ? elementInstance.dataSchema[elementKey]?.anyOf
            : []
        }
        getOptionValue={(option) => option.const.toString()}
        getOptionLabel={(option) => option.title}
        placeholder={elementInstance.uiSchema.placeholder}
      />
      {elementInstance.dataSchema &&
        elementInstance.dataSchema[elementKey]?.description && (
          <p className="text-text text-[0.8rem]">
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
    mode: 'onBlur',
    defaultValues: {
      dataSchema: elementInstance.dataSchema,
      uiSchema: elementInstance.uiSchema,
      selectOptions:
        (elementInstance.dataSchema &&
          elementInstance.dataSchema[elementInstance.uiSchema.key].anyOf) ||
        [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'selectOptions',
  });
  function updateSchemas(values: {
    uiSchema: UISchema;
    dataSchema: SchemaProperty;
    selectOptions: { const: string; title: string }[];
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
    values.dataSchema[newName].anyOf = values.selectOptions;
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
      <div className="flex flex-col">
        {fields.map(({ id }, index) => (
          <div className="flex border-2" key={index}>
            <Button
              variant={'outline'}
              className="gap-2"
              onClick={() => remove(index)}
            >
              <MinusCircledIcon />
            </Button>
            <div className="flex flex-col">
              <Label className="mb-2">Option Label</Label>
              <Controller
                control={form.control}
                name={`selectOptions[${index}].title`}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="Placeholder"
                    className="w-full"
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-2">Option Value</Label>
              <Controller
                control={form.control}
                name={`selectOptions[${index}].const`}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="Placeholder"
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>
        ))}
        <Button
          variant={'outline'}
          className="gap-2"
          onClick={() => append({ const: 'New Option', title: 'New Option' })}
        >
          <PlusCircledIcon />
          Add Options
        </Button>
      </div>
    </form>
  );
}
