import { Input, Label } from '@engine/design-system';
import { TextAlignCenterIcon } from '@radix-ui/react-icons';
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
      scope: `#/properties/${key}`,
    },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Text  filed',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  // propertiesComponent: () => <div>Designer component</div>,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label variant={'base'}>{elementInstance.uiSchema.key}</Label>
      <Input readOnly disabled placeholder={'placeholder'} />
      {/* {elementInstance.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {elementInstance.helperText}
        </p>
      )} */}
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
      <Input placeholder={elementInstance.uiSchema.key} />
      {/* {elementInstance.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {elementInstance.helperText}
        </p>
      )} */}
    </div>
  );
}
