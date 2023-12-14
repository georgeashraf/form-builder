import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, ReactNode, useState } from 'react';
import {
  DataSchema,
  FormElementInstance,
  SchemaPrimitiveType,
  UISchema,
} from '../types';
import { addPropertyByPath, findPath, removePropertyByPath } from '../utils';

type DesignerContextType = {
  dataSchema: DataSchema;
  uiSchema?: UISchema;
  addElementSchemas: (element: FormElementInstance) => void;
  removeElement: (key: string) => void;
  removeLayout: (key: string) => void;
  addElementBefore: (
    element: FormElementInstance,
    keyOfElementBefore: string
  ) => void;
  addElementAfter: (
    element: FormElementInstance,
    keyOfElementAfter: string
  ) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const baseDataSchema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Form',
    description: 'New Form DataSchema',
    type: 'object' as SchemaPrimitiveType,
    properties: {},
  };
  const [dataSchema, setDataSchema] = useState<DataSchema>(baseDataSchema);
  const [uiSchema, setUISchema] = useState<UISchema | undefined>();

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
  const addElementSchemas = (element: FormElementInstance) => {
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
  const addElementBefore = (
    element: FormElementInstance,
    keyOfElementBefore: string
  ) => {
    let dataSchemaControlPath = findPath(dataSchema, 'key', keyOfElementBefore);
    dataSchemaControlPath = dataSchemaControlPath?.replace('/key', '');
    dataSchemaControlPath = dataSchemaControlPath?.replace('/', '');

    let uiSchemaControlPath = findPath(uiSchema, 'key', keyOfElementBefore);
    uiSchemaControlPath = uiSchemaControlPath?.replace('/', '');
    uiSchemaControlPath = uiSchemaControlPath?.replace('/key', '');
    const newDataSchema = addPropertyByPath(
      dataSchema,
      dataSchemaControlPath!,
      element.extraAttributes?.dataSchema
    );
    console.log(
      '🚀 ~ file: DesignerContext.tsx:136 ~ newDataSchema:',
      newDataSchema
    );
    const newUISchema = addPropertyByPath(
      uiSchema,
      uiSchemaControlPath!,
      element.extraAttributes?.uiSchema
    );
    console.log(
      '🚀 ~ file: DesignerContext.tsx:142 ~ newUISchema:',
      newUISchema
    );
    setDataSchema(newDataSchema);
    setUISchema(newUISchema);
  };
  const addElementAfter = (
    element: FormElementInstance,
    keyOfElementAfter: string
  ) => {};
  return (
    <DesignerContext.Provider
      value={{
        dataSchema,
        uiSchema,
        addElementSchemas,
        addElementBefore,
        addElementAfter,
        removeElement,
        removeLayout,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
