import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, ReactNode, useState } from 'react';
import {
  DataSchema,
  FormElementInstance,
  SchemaPrimitiveType,
  UISchema,
} from '../types';

type DesignerContextType = {
  elements: FormElementInstance[];
  dataSchema: any;
  uiSchema: any;
  addElement: (index: number, element: FormElementInstance) => void;
  addElementSchemas: (
    parentKey: UniqueIdentifier,
    element: FormElementInstance
  ) => void;
  removeElement: (id: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const baseDataSchema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Product',
    description: "A product from Acme's catalog",
    type: 'object' as SchemaPrimitiveType,
    properties: {},
  };
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [dataSchema, setDataSchema] = useState<DataSchema>(baseDataSchema);
  const [uiSchema, setUISchema] = useState<any>();

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  const removeElement = (key: string) => {
    setElements((prev) => prev.filter((element) => element.key !== key));
  };
  const addElementSchemas = (
    parentKey: UniqueIdentifier,
    element: FormElementInstance
  ) => {
    if (
      Object.keys(dataSchema.properties).length === 0 &&
      element.type === 'Input'
    ) {
      setDataSchema((prev) => {
        return {
          ...prev,
          properties: {
            ...prev.properties,
            [element.key]: element.extraAttributes?.dataSchema,
          },
        };
      });
    }

    if (uiSchema === undefined) {
      setUISchema(element.extraAttributes?.uiSchema);
    }
    if (uiSchema && Object.keys(uiSchema).length) {
      if (element.extraAttributes) {
        element.extraAttributes.uiSchema.scope = `#/properties/${element.key}`;
      }
      setUISchema((prev: UISchema) => {
        return {
          ...prev,
          elements: prev?.elements
            ? [...prev.elements, element.extraAttributes?.uiSchema]
            : [element.extraAttributes?.uiSchema],
        };
      });
    }
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        dataSchema,
        uiSchema,
        removeElement,
        addElementSchemas,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
