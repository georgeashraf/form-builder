import { TextFieldFormElement } from './FormElements/TextField';

export type ElementsType = 'TextField';

export type FormElement = {
  type: ElementsType;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  construct: (id: string) => FormElementInstance;

  designerComponent: React.FC<{elementInstance: FormElementInstance}>;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};
type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
