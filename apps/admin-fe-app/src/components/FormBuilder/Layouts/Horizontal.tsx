import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { FormElement, FormElementInstance } from '../types';

export const HorizontalLayoutElement: FormElement = {
  type: 'HorizontalLayout',
  construct: (id: string) => ({
    id,
    type: 'Layout',
    subtype: 'HorizontalLayout',
    extraAttributes: {
      uiSchema: { key: id, type: 'HorizontalLayout', elements: [] },
    },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Horizontal',
  },
  designerComponent: DesignerComponent,

  //   formComponent: () => <div>Designer component</div>,
  //   propertiesComponent: () => <div>Designer component</div>,
};

function DesignerComponent({
  elementInstance,
  cols = 1,
  children,
}: {
  elementInstance: FormElementInstance;
  cols?: number;
  children?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-row flex-grow items-start gap-4 justify-between flex-1 `}
    >
      {children}
    </div>
  );
}
