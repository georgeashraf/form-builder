import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, ReactNode, useState } from 'react';
import {
  DataSchema,
  FormElementInstance,
  SchemaPrimitiveType,
  UISchema,
} from '../types';
import { findPath, removePropertyByPath } from '../utils';

type DesignerContextType = {
  // elements: FormElementInstance[];
  dataSchema: any;
  uiSchema: any;
  // addElement: (index: number, element: FormElementInstance) => void;
  addElementSchemas: (
    parentKey: UniqueIdentifier,
    element: FormElementInstance
  ) => void;
  removeElement: (key: string) => void;
  removeLayout: (key: string) => void;
  // removeElement: (id: string) => void;
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
  const [uiSchema, setUISchema] = useState<UISchema>();

  // const addElement = (index: number, element: FormElementInstance) => {
  //   setElements((prev) => {
  //     const newElements = [...prev];
  //     newElements.splice(index, 0, element);
  //     return newElements;
  //   });
  // };
  // const removeElement = (key: string) => {
  //   setElements((prev) => prev.filter((element) => element.key !== key));
  // };
  const removeElement = (key: string) => {
    let dataSchemaControlPath = findPath(dataSchema, 'key', key);
    dataSchemaControlPath = dataSchemaControlPath?.replace('/key', '');
    dataSchemaControlPath = dataSchemaControlPath?.replace('/', '');
    let uiSchemaControlPath = findPath(uiSchema, 'key', key);
    uiSchemaControlPath = uiSchemaControlPath?.replace('/', '');
    uiSchemaControlPath = uiSchemaControlPath?.replace('/key', '');
    const updatedDataSchema = removePropertyByPath(
      dataSchema,
      dataSchemaControlPath!
    );
    const updatedUISchema = removePropertyByPath(
      uiSchema,
      uiSchemaControlPath!
    );

    setDataSchema(updatedDataSchema);
    setUISchema((prev) => {
      return {
        ...prev,
        ...updatedUISchema,
      };
    });
  };

  const removeLayout = (key: string) => {
    let uiSchemaControlPath = findPath(uiSchema, 'key', key);
    uiSchemaControlPath = uiSchemaControlPath?.replace('/', '');
    uiSchemaControlPath = uiSchemaControlPath?.replace('/key', '');
    const updatedUISchema = removePropertyByPath(
      uiSchema,
      uiSchemaControlPath!
    );
    if (Object.keys(updatedUISchema).length) {
      setUISchema((prev) => {
        return {
          ...prev,
          ...updatedUISchema,
        };
      });
    } else {
      setUISchema(undefined);
    }
  };
  const addElementSchemas = (
    parentKey: UniqueIdentifier,
    element: FormElementInstance
  ) => {
    if (element.type === 'Input') {
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
    if (uiSchema !== undefined && Object.keys(uiSchema).length) {
      if (element.extraAttributes) {
        element.extraAttributes.uiSchema.scope = `#/properties/${element.key}`;
      }
      setUISchema((prev) => {
        if (prev)
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
        dataSchema,
        uiSchema,
        addElementSchemas,
        removeElement,
        removeLayout,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
