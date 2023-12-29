import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { FormElement, FormElementInstance } from '../types';

export const VerticalLayoutElement: FormElement = {
  type: 'VerticalLayout',
  construct: (key: string) => ({
    key,
    type: 'Layout',
    subtype: 'VerticalLayout',
    uiSchema: { key, name: key, type: 'VerticalLayout', elements: [] },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Vertical',
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  propertiesComponent: () => <div>Designer component</div>,
};

function DesignerComponent({ children }: { children?: ReactNode }) {
  return (
    <>
      <div
        className={`flex flex-col min-h-[150px]  items-start gap-4 justify-between flex-1  border-primary border-4  `}
      >
        {children}
      </div>
    </>
  );
}

function FormComponent({ children }: { children?: ReactNode }) {
  return (
    <div
      className={`flex flex-col flex-grow items-start gap-4 justify-between flex-1 `}
    >
      {children}
    </div>
  );
}
