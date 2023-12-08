import { SidebarBtnElement } from './SidebarBtnElement';
import { FormElements } from './types';

const DesignerSideBar = () => {
  return (
    <aside className="rounded-xl w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background border-primary overflow-y-auto h-full">
      <div>
        Form Elements
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
      {/* <div>
        Layouts
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div> */}
    </aside>
  );
};

export default DesignerSideBar;
