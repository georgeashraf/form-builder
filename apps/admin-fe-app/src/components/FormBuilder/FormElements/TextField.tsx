import { Input, Label } from '@engine/design-system';
import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import { FormElement, FormElementInstance } from '../types';

export const TextFieldFormElement: FormElement = {
  type: 'TextField',
  construct: (key: string) => ({
    key,
    type: 'Input',
    subtype: 'TextField',
    extraAttributes: {
      dataSchema: {
        key,
        type: 'string',
        pattern: '',
        nullable: true,
        maxLength: 255,
        minLength: 1,
        errorMessage: { type: 'foo must be an Integer' },
      },
      uiSchema: {
        key,
        type: 'Control',
        label: '',
        scope: '#/properties/first',
      },
    },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Text  filed',
  },
  designerComponent: DesignerComponent,
  // formComponent: () => <div>Designer component</div>,
  // propertiesComponent: () => <div>Designer component</div>,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {elementInstance.extraAttributes?.uiSchema.key}
        {elementInstance.extraAttributes?.required && '*'}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={elementInstance.extraAttributes?.placeholder}
      />
      {elementInstance.extraAttributes?.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {elementInstance.extraAttributes?.helperText}
        </p>
      )}
    </div>
  );
}
