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
  const { removeLayout } = useDesigner();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => removeLayout(elementInstance.key)}
              className=" ml-1 flex w-5 h-5 items-center justify-center -top-1 -right-1 rounded-full  bg-accent"
            >
              <Cross1Icon className="" width={10} height={10} stroke="black" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <h1 className="text-white">{elementInstance.subtype}</h1>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        className={`flex flex-row min-h-[100px] w-full items-start gap-4 justify-between flex-1 border-primary border-4	hover:bg-transparent `}
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
      className={`flex flex-row flex-grow items-start gap-4 justify-between flex-1`}
    >
      {children}
    </div>
  );
}
