
import useDesigner from '../Hooks/useDesigner';
import FormElementsSideBar from './FormElementsSideBar';
import PropertiesFormSideBar from './PropertiesFormSideBar';

const DesignerSideBar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="rounded-xl w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background border-primary overflow-y-auto h-full">
      {!selectedElement && <FormElementsSideBar />}
      {selectedElement && <PropertiesFormSideBar />}

    </aside>
  );
};

export default DesignerSideBar;
