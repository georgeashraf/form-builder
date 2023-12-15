import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, ReactNode, useState } from 'react';
import {
  DataSchema,
  FormElementInstance,
  SchemaPrimitiveType,
  UISchema,
} from '../types';
import { addPropertyByPath, findPath, removePropertyByPath } from '../helpers';

type DesignerContextType = {
  dataSchema: DataSchema;
  uiSchema?: UISchema;
  addElementSchemas: (element: FormElementInstance) => void;
  removeElement: (key: string) => void;
  removeLayout: (key: string) => void;
  addElementInPosition: (
    element: FormElementInstance,
    keyOfElementBefore: string,
    position: 'before' | 'after'
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
    if (uiSchema === undefined) {
      setUISchema(element.uiSchema);
    }
    if (uiSchema !== undefined && Object.keys(uiSchema).length) {
      // if (element.uiSchema) {
      //   element.uiSchema.scope = `#/properties/${element.uiSchema.key}`;
      // }
      setUISchema((prev) => {
        if (prev)
          return {
            ...prev,
            elements: prev?.elements
              ? [...prev.elements, element.uiSchema]
              : [element.uiSchema],
          };
      });
    }
    if (element.type === 'Input' && element.dataSchema) {
      setDataSchema((prev) => {
        return {
          ...prev,
          properties: {
            ...prev.properties,
            ...element.dataSchema!,
          },
        };
      });
    }
  };
  const addElementInPosition = (
    element: FormElementInstance,
    keyOfElementBefore: string,
    position: 'before' | 'after'
  ) => {
    let dataSchemaControlPath = findPath(dataSchema, 'key', keyOfElementBefore);
    dataSchemaControlPath = dataSchemaControlPath?.replace(
      `/${keyOfElementBefore}/key`,
      ''
    );
    dataSchemaControlPath = dataSchemaControlPath?.replace('/', '');

    let uiSchemaControlPath = findPath(uiSchema, 'key', keyOfElementBefore);
    uiSchemaControlPath = uiSchemaControlPath?.replace('/', '');
    uiSchemaControlPath = uiSchemaControlPath?.replace('/key', '');
    const newDataSchema = addPropertyByPath(
      dataSchema,
      dataSchemaControlPath!,
      element?.dataSchema!,
      keyOfElementBefore,
      position
    );
    const newUISchema = addPropertyByPath(
      uiSchema,
      uiSchemaControlPath!,
      element?.uiSchema,
      keyOfElementBefore,
      position
    );
    setDataSchema(newDataSchema);
    setUISchema(newUISchema);
  };
  return (
    <DesignerContext.Provider
      value={{
        dataSchema,
        uiSchema,
        addElementSchemas,
        addElementInPosition,
        removeElement,
        removeLayout,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
