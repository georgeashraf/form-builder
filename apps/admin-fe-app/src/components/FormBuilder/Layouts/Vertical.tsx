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
    extraAttributes: {
      uiSchema: { key, type: 'VerticalLayout', elements: [] },
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
  const { removeLayout } = useDesigner();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => removeLayout(elementInstance.key)}
              className=" flex ml-1 w-5 h-5 items-center justify-center -top-1 -right-1 rounded-full bg-black"
            >
              <Cross1Icon className="" width={10} height={10} stroke="white" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <h1 className="text-white">{elementInstance.subtype}</h1>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        className={`flex flex-col flex-grow items-start gap-4 justify-between flex-1  border-slate-400 border-4 hover:bg-transparent `}
      >
        {children}
      </div>
    </>
  );
}
