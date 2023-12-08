import { Button } from '@engine/design-system';
import Designer from './Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';
import FormSubmitionForm from './FormSubmitionForm';
import DesignerContextProvider from './Context/DesignerContext';
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
    <DesignerContextProvider>
      <DndContext sensors={sensors}>
        <div className="mx-2 mt-10 flex flex-col w-full  text-text">
          <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2>Form:</h2>
            <FormSubmitionForm />
            <div className="flex items-center gap-2">
              <Button>Save</Button>
              <Button>Preview</Button>
            </div>
          </div>
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px]  bg-[url(/plus.svg)]">
            <Designer />
          </div>
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </DesignerContextProvider>
  );
};

export default FormBuilder;
