import DesignerSideBar from './DesignerSideBar';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { cn } from '@engine/design-system';
import useDesigner from './Hooks/useDesigner';
import { ElementsType, FormElements } from './types';
import ShortUniqueId from 'short-unique-id';
import FormRenderer from './Renderers/FormRenderer';
const Designer = () => {
  const uniqueId = new ShortUniqueId({ length: 16 });
  const { elements, addElement, dataSchema, uiSchema, addElementSchemas } =
    useDesigner();
  console.log('🚀 ~ file: Designer.tsx:15 ~ Designer ~ uiSchema:', uiSchema);

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
        // addElement(0, newElement);
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
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow  justify-start flex-1 overflow-y-auto',
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

export default Designer;
