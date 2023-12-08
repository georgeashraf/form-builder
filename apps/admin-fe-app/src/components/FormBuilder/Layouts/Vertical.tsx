import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { FormElement, FormElementInstance } from '../types';

export const VerticalLayoutElement: FormElement = {
  type: 'VerticalLayout',
  construct: (id: string) => ({
    id,
    type: 'Layout',
    subtype: 'VerticalLayout',
    extraAttributes: {
      uiSchema: { key: id, type: 'VerticalLayout', elements: [] },
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
    <div className={`grid grid-rows-${cols} grid-flow-col gap-4  divide-y `}>
      {children}
    </div>
  );
}
