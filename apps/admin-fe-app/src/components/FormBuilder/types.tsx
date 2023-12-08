import { TextFieldFormElement } from './FormElements/TextField';
import { HorizontalLayoutElement } from './Layouts/Horizontal';

export type ElementsType = 'TextField' | 'HorizontalLayout';

export type FormElement = {
  type: ElementsType;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  construct: (id: string) => FormElementInstance;
  baseDataSchema?: any;
  baseUISchema: any;
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  // formComponent: React.FC;
  // propertiesComponent: React.FC;
};

export type FormElementInstance = {
  id: string;
  type: 'Input' | 'Layout';
  subtype: ElementsType;
  extraAttributes?: Record<string, any>;
};
type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  HorizontalLayout: HorizontalLayoutElement,
};
