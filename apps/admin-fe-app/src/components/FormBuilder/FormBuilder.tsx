import Designer from './Designer/Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './Wrappers/DragOverlayWrapper';
import { useParams } from 'react-router-dom';
import FormSubmitionForm from '../../pages/forms/Formform';
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
  const { requestKey } = useParams();
  return (
    <DndContext sensors={sensors}>
      <div className="flex justify-evenly border-b-2 items-center">
        <h2>Form:</h2>
        {requestKey && <FormSubmitionForm requestkey={requestKey} />}
      </div>
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-full  bg-[url(/plus.svg)]">
        <Designer />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
