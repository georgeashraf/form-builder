import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@engine/design-system';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { FormElement, FormElementInstance } from '../types';

export const GroupAccordionLayoutElement: FormElement = {
  type: 'GroupAccordionLayout',
  construct: (key: string) => ({
    key,
    type: 'Layout',
    subtype: 'GroupAccordionLayout',
    uiSchema: {
      key,
      name: key,
      type: 'GroupAccordionLayout',
      label: 'Group',
      elements: [],
    },
  }),
  designerBtnElement: {
    icon: CaretSortIcon,
    label: 'Accordion',
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  propertiesComponent: () => <div>Designer component</div>,
};

function DesignerComponent({
  children,
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  children?: ReactNode;
}) {
  return (
    <Accordion
      className={`flex flex-row min-h-[100px] w-full items-start gap-4 justify-between flex-1 border-primary border-4 	 `}
      type="single"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{elementInstance.uiSchema.label}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function FormComponent({
  children,
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  children?: ReactNode;
}) {
  return (
    <Accordion
      className={`flex tems-start gap-4 justify-between flex-1`}
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{elementInstance.uiSchema.label}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
