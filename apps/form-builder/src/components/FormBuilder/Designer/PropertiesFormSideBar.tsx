import { Button } from '@engine/design-system';
import { Cross1Icon } from '@radix-ui/react-icons';
import useDesigner from '../Hooks/useDesigner';
import { FormElements } from '../types';

const PropertiesFormSideBar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.subtype].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-md text-accent font-bold">Element Properties</p>
        <Button variant={'ghost'} onClick={() => setSelectedElement(null)}>
          <Cross1Icon />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSideBar;
