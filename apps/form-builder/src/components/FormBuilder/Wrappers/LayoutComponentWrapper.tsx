import { useDroppable } from '@dnd-kit/core';
import {
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@engine/design-system';
import { Cross1Icon, MoveIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import useDesigner from '../Hooks/useDesigner';
import { FormElementInstance, FormElements } from '../types';

const LayoutComponentWrapper = ({
  element,
  children,
}: {
  element: FormElementInstance;
  children: ReactNode;
}) => {
  const { removeLayout } = useDesigner();
  const dropZone = useDroppable({
    id: `${element.key}-layout`,
    data: {
      isDesignerDropZone: true,
    },
  });
  const DesignerElement = FormElements[element.subtype].designerComponent;
  return (
    <>
      <div className="flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => removeLayout(element.key)}
                className=" ml-1 flex w-5 h-5 items-center justify-center -top-1 -right-1 rounded-full  bg-accent"
              >
                <Cross1Icon
                  className=""
                  width={10}
                  height={10}
                  stroke="black"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <h1 className="text-white">{element.subtype}</h1>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => removeLayout(element.key)}
                className=" ml-1 flex w-5 h-5 items-center justify-center -top-1 -right-1 rounded-full  bg-accent"
              >
                <MoveIcon className="" width={10} height={10} stroke="black" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <h1 className="text-white">{element.subtype}</h1>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        ref={dropZone.setNodeRef}
        className={cn('relative  rounded-md  h-full w-full p-2')}
      >
        <DesignerElement elementInstance={element}>{children}</DesignerElement>
      </div>
    </>
  );
};

export default LayoutComponentWrapper;
