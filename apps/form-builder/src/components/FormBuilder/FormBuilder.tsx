import Designer from './Designer/Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './Wrappers/DragOverlayWrapper';
import FormPreview from './FormPreview';
import { Button } from '@engine/design-system';
const FormBuilder = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <>
      <div className="float-right m-2">
        <FormPreview
          trigger={
            <Button
              type="submit"
              variant={'outline'}
              className="shadow-lg border-secondary hover:bg-secondary"
            >
              Preview Form
            </Button>
          }
        />
      </div>
      <DndContext sensors={sensors}>
        <div className="flex justify-evenly border-b-2 items-center"></div>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-full  bg-[url(/plus.svg)]">
          <Designer />
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </>
  );
};

export default FormBuilder;
