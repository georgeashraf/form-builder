import { Label } from "@engine/design-system";
import { FormElements } from "../types";
import { SidebarBtnElement } from "./SidebarBtnElement";

const FormElementsSideBar = () => {
  return (
    <div>
      <Label>Form Elements</Label>
      <div>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
      <Label>Layouts</Label>
      <div className="flex flex-row gap-3">
        <SidebarBtnElement formElement={FormElements.HorizontalLayout} />
        <SidebarBtnElement formElement={FormElements.VerticalLayout} />
      </div>
    </div>
  );
};

export default FormElementsSideBar;
