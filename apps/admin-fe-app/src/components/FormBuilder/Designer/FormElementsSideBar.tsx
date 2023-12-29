import { Label } from '@engine/design-system';
import { FormElements } from '../types';
import { SidebarBtnElement } from './SidebarBtnElement';

const FormElementsSideBar = () => {
  return (
    <div>
      <Label>Form Elements</Label>
      <div className="flex flex-row gap-3 mb-2">
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
      </div>
      <div className="flex flex-row gap-3 mb-2">
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.DateRangeField} />
      </div>
      <div className="flex flex-row gap-3 mb-2">
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.MultiSelectField} />
      </div>
      <div className="flex flex-row gap-3 mb-2">
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
      </div>
      <Label>Layouts</Label>
      <div className="flex flex-row gap-3">
        <SidebarBtnElement formElement={FormElements.HorizontalLayout} />
        <SidebarBtnElement formElement={FormElements.VerticalLayout} />
      </div>
      <div className="flex flex-row gap-3">
        <SidebarBtnElement formElement={FormElements.GroupAccordionLayout} />
      </div>
    </div>
  );
};

export default FormElementsSideBar;
