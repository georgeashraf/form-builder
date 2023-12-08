import DesignerSideBar from './DesignerSideBar';
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { Button, cn } from '@engine/design-system';
import useDesigner from './Hooks/useDesigner';
import { ElementsType, FormElementInstance, FormElements } from './types';
import ShortUniqueId from 'short-unique-id';
import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import FormRenderer from './Renderers/FormRenderer';
const Designer = () => {
  const uniqueId = new ShortUniqueId({ length: 16 });
  const { elements, addElement, dataSchema, uiSchema, addElementSchemas } =
    useDesigner();
  const dropZone = useDroppable({
    id: uniqueId.rnd(),
    data: {
      isDesignerDropZone: true,
    },
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          uniqueId.rnd()
        );
        addElement(0, newElement);
        addElementSchemas(over.id, newElement);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={dropZone.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            dropZone.isOver && 'ring-2 ring-primary'
          )}
        >
          {!dropZone.isOver && !uiSchema && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop components
            </p>
          )}
          {dropZone.isOver && !uiSchema && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-white"></div>
            </div>
          )}
          {/* {elements.length > 0 && (
            <div className="flex flex-col w-full h-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )} */}
          <div>
            <FormRenderer
              dataSchema={dataSchema}
              uiSchema={uiSchema}
              isDesigner={true}
            />
          </div>
        </div>
      </div>
      <DesignerSideBar />
    </div>
  );
};
export const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });
  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
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
        'relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset',
        element.type === 'Layout' ? 'h-full' : 'h-[120px]'
      )}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={'outline'}
              onClick={() => removeElement(element.id)}
            >
              <TrashIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click For Properties
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-green-900 rounded-b-none" />
      )}
      <div
        className={cn(
          'flex w-full items-center rounded-md bg-accent px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30',
          element.type === 'Layout' ? 'h-full' : 'h-[120px]'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-green-900 rounded-t-none" />
      )}
    </div>
  );
};

export default Designer;
