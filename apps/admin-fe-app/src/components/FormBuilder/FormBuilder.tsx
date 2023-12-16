import { Button } from '@engine/design-system';
import Designer from './Designer/Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './Wrappers/DragOverlayWrapper';
import FormSubmitionForm from './FormSubmitionForm';
import DesignerContextProvider from './Context/DesignerContext';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()
  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <DesignerContextProvider>
      <DndContext sensors={sensors}>
        <div className="mx-2 flex flex-col w-full h-full  text-text">
          <div className="flex justify-between border-b-2  gap-3 items-center">
            <h2>Form:</h2>
            <FormSubmitionForm />
            <div className="flex items-center gap-2">
              <Button>Save</Button>
              <Button onClick={() => navigate('/form-preview')}>Preview</Button>
            </div>
          </div>
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-full  bg-[url(/plus.svg)]">
            <Designer />
          </div>
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </DesignerContextProvider>
  );
};

export default FormBuilder;
