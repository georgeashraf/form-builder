import { useDroppable, useDraggable } from '@dnd-kit/core';
import { cn, Button } from '@engine/design-system';
import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import useDesigner from '../Hooks/useDesigner';
import { FormElementInstance, FormElements } from '../types';
const DesignerComponentWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const top = useDroppable({
    id: element.key + '-top',
    data: {
      type: element.type,
      elementId: element.key,
      isTopDesignerElement: true,
    },
  });
  const bottom = useDroppable({
    id: element.key + '-bottom',
    data: {
      type: element.type,
      elementId: element.key,
      isBottomDesignerElement: true,
    },
  });
  const left = useDroppable({
    id: element.key + '-left',
    data: {
      type: element.type,
      elLeftementId: element.key,
      isDesignerElement: true,
    },
  });
  const right = useDroppable({
    id: element.key + '-right',
    data: {
      type: element.type,
      elementId: element.key,
      isRightDesignerElement: true,
    },
  });
  const draggable = useDraggable({
    id: element.key + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.key,
      isDesignerElement: true,
    },
  });
  if (draggable.isDragging) return null;
  const DesignerElement = FormElements[element.subtype].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        'relative flex flex-col w-full  hover:cursor-pointer rounded-md ring-1 ring-primary ring-inset',
        element.type === 'Layout' ? 'h-full' : 'h-[120px]'
      )}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={top.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottom.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      <div
        ref={left.setNodeRef}
        className="absolute w-1/2  h-full rounded-b-md"
      />
      <div
        ref={right.setNodeRef}
        className="absolute w-1/2 right-0  h-full rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-error"
              variant={'outline'}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.key);
                setSelectedElement(null);
              }}
            >
              <TrashIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-text text-md">Click to Edit Properties</p>
          </div>
        </>
      )}
      {top.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-accent rounded-b-none" />
      )}
      {left.isOver && (
        <div className="absolute left-0 h-full rounded-md w-[7px] bg-accent  " />
      )}
      <div
        className={cn(
          'flex w-full items-center rounded-md bg-primary  px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30',
          element.type === 'Layout' ? 'h-full' : 'h-[120px]'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottom.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-accent rounded-t-none" />
      )}
      {right.isOver && (
        <div className="absolute right-0 h-full rounded-md w-[7px] bg-accent  " />
      )}
    </div>
  );
};

export default DesignerComponentWrapper;
