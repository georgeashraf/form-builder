import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@engine/design-system';
import { Cross1Icon, TextAlignCenterIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { text } from 'stream/consumers';
import useDesigner from '../Hooks/useDesigner';
import { FormElement, FormElementInstance } from '../types';

export const VerticalLayoutElement: FormElement = {
  type: 'VerticalLayout',
  construct: (key: string) => ({
    key,
    type: 'Layout',
    subtype: 'VerticalLayout',
    uiSchema: { key, type: 'VerticalLayout', elements: [] },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Vertical',
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
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
    <>
      <div
        className={`flex flex-col min-h-[150px]  items-start gap-4 justify-between flex-1  border-primary border-4  `}
      >
        {children}
      </div>
    </>
  );
}

function FormComponent({
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
      className={`flex flex-col flex-grow items-start gap-4 justify-between flex-1 `}
    >
      {children}
    </div>
  );
}
