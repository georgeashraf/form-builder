import { ControlEffect, SchemaProperty, UISchema } from '@engine/shared-types';
import { ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { DateFieldFormElement } from './FormElements/DateField';
import { DateRangeFieldFormElement } from './FormElements/DateRangeField';
import { MultiSelectFieldFormElement } from './FormElements/MultiSelectField';
import { NumberFieldFormElement } from './FormElements/NumberField';
import { SelectFieldFormElement } from './FormElements/SelectField';
import { TextAreaFieldFormElement } from './FormElements/TextArea';
import { TextFieldFormElement } from './FormElements/TextField';
import { GroupAccordionLayoutElement } from './Layouts/GroupAccordionLayout';
import { HorizontalLayoutElement } from './Layouts/Horizontal';
import { VerticalLayoutElement } from './Layouts/Vertical';

export const RuleEffects = ['HIDE', 'SHOW', 'ENABLE', 'DISABLE'] as const;
export const OPERATORS = [
  'eq',
  'ne',
  'contains',
  'lt',
  'lte',
  'gt',
  'gte',
] as const;
export type Operator = (typeof OPERATORS)[number];
export const EffectMap = new Map<string, string>([
  ['ENABLE', 'DISABLE'],
  ['DISABLE', 'ENABLE'],
  ['SHOW', 'HIDE'],
  ['HIDE', 'SHOW'],
]);
export type ElementsType =
  | 'TextField'
  | 'HorizontalLayout'
  | 'VerticalLayout'
  | 'GroupAccordionLayout'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'DateRangeField'
  | 'SelectField'
  | 'MultiSelectField';

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
    form?: UseFormReturn<FieldValues, any, undefined>;
    children?: ReactNode;
    effect?: ControlEffect;
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
  GroupAccordionLayout: GroupAccordionLayoutElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  DateRangeField: DateRangeFieldFormElement,
  SelectField: SelectFieldFormElement,
  MultiSelectField: MultiSelectFieldFormElement,
};
