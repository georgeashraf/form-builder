import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { FormElement } from '../types';

export const HorizontalLayoutElement: FormElement = {
  type: 'HorizontalLayout',
  construct: (key: string) => ({
    key,
    type: 'Layout',
    subtype: 'HorizontalLayout',
    uiSchema: { key, name: key, type: 'HorizontalLayout', elements: [] },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Horizontal',
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  propertiesComponent: () => <div>Designer component</div>,
};

function DesignerComponent({ children }: { children?: ReactNode }) {
  return (
    <div
      className={`flex min-w-[100px] min-h-[100px]  w-full items-start gap-4 justify-between border-secondary border-4`}
    >
      {children}
    </div>
  );
}

function FormComponent({ children }: { children?: ReactNode }) {
  return (
    <div
      className={`flex flex-row flex-grow items-start gap-4 justify-between flex-1`}
    >
      {children}
    </div>
  );
}
