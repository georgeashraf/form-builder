import { Label } from '@engine/design-system';
import { SidebarBtnElement } from './SidebarBtnElement';
import { FormElements } from './types';

const DesignerSideBar = () => {
  return (
    <aside className="rounded-xl w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background border-primary overflow-y-auto h-full">
      <Label>Form Elements</Label>
      <div>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
      <Label>Layouts</Label>
      <div className="flex flex-row gap-3">
        <SidebarBtnElement formElement={FormElements.HorizontalLayout} />
        <SidebarBtnElement formElement={FormElements.VerticalLayout} />
      </div>
    </aside>
  );
};

export default DesignerSideBar;
