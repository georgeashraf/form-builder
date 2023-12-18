import { Input, Label } from '@engine/design-system';
import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { FormElement, FormElementInstance } from '../types';

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
      <Label variant={'base'}>{elementKey}</Label>
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
        {elementInstance.uiSchema.key}
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

const propertiesSchema = z.object({
  label: z.string().min(1).max(50),
  name: z.string().min(1).max(50),
  required: z.boolean().default(false),
  description: z.string().max(255).optional(),
  placeholder: z.string().max(50).optional(),
  pattern: z.string().max(255).optional(),
});

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <div>Properties</div>;
}
