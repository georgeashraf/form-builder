import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@engine/design-system';
import { Cross1Icon, TextAlignCenterIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import useDesigner from '../Hooks/useDesigner';
import { FormElement, FormElementInstance } from '../types';

export const HorizontalLayoutElement: FormElement = {
  type: 'HorizontalLayout',
  construct: (key: string) => ({
    key,
    type: 'Layout',
    subtype: 'HorizontalLayout',
    uiSchema: { key, type: 'HorizontalLayout', elements: [] },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Horizontal',
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
    <div
      className={`flex flex-row min-h-[100px] w-full items-start gap-4 justify-between flex-1 border-primary border-4 	 `}
    >
      {children}
    </div>
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
      className={`flex flex-row flex-grow items-start gap-4 justify-between flex-1`}
    >
      {children}
    </div>
  );
}
