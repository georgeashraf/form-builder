import { ReactNode } from 'react';
import { TextFieldFormElement } from './FormElements/TextField';
import { HorizontalLayoutElement } from './Layouts/Horizontal';
import { VerticalLayoutElement } from './Layouts/Vertical';

export type ElementsType = 'TextField' | 'HorizontalLayout' | 'VerticalLayout';
export type SchemaPrimitiveType =
  | 'object'
  | 'array'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null';

export type SchemaPropertyBody = {
  type: SchemaPrimitiveType | SchemaPrimitiveType[];
  description?: string;
  properties?: SchemaProperty;
  items?: { type: SchemaPrimitiveType | SchemaPrimitiveType[] };
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  required?: string[];
  enum?: SchemaPrimitiveType[];
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLenght?: number;
  pattern?: string;
  dependentRequired?: {
    [key: string]: string[];
  };
};
export type SchemaProperty = {
  [key: string]: SchemaPropertyBody;
};
export type DataSchema = {
  $schema?: string;
  title?: string;
  description?: string;
  type: SchemaPrimitiveType | SchemaPrimitiveType[];
  properties: SchemaProperty;
  required?: string[];
};
export type UISchema = {
  key: string;
  type: string;
  name: string;
  label?: string;
  scope?: string;
  placeholder?: string;
  elements?: UISchema[];
};
export type FormElement = {
  type: ElementsType;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  construct: (key: string) => FormElementInstance;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
    cols?: number;
    children?: ReactNode;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    children?: ReactNode;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  key: string;
  type: 'Input' | 'Layout';
  subtype: ElementsType;
  uiSchema: UISchema;
  dataSchema?: SchemaProperty;
};
type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  HorizontalLayout: HorizontalLayoutElement,
  VerticalLayout: VerticalLayoutElement,
};
