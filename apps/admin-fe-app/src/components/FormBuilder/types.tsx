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

export type SchemaProperty = {
  [key: string]: {
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
  label?: string;
  scope?: string;
  elements?: UISchema[];
};
export type FormElement = {
  type: ElementsType;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  construct: (id: string) => FormElementInstance;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
    cols?: number;
    children?: ReactNode;
  }>;
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
  VerticalLayout: VerticalLayoutElement,
};
