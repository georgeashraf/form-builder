import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, ReactNode, useState } from 'react';
import {
  DataSchema,
  FormElementInstance,
  SchemaPrimitiveType,
  UISchema,
} from '../types';
import {
  addElementInLayoutByPath,
  addPropertyByPath,
  findPath,
  removePropertyByPath,
  UpdateUiElementByKey,
} from '../helpers';

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
  addElementInLayout: (element: FormElementInstance, layoutKey: string) => void;
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
  const uSchema = {
    key: 'rkBMY92EH6Li9RA2',
    type: 'HorizontalLayout',
    elements: [
      {
        key: '2O9atN2dLWxaYpS6',
        type: 'HorizontalLayout',
        elements: [],
      },
    ],
  };
  const element = {
    key: 'JqgXfhNwWlKkq8N8',
    type: 'Control',
    label: '',
    scope: '#/properties/JqgXfhNwWlKkq8N8',
  };
  const parent = '2O9atN2dLWxaYpS6';

  const wrong = {
    key: 'rkBMY92EH6Li9RA2',
    type: 'HorizontalLayout',
    elements: [
      {
        key: '2O9atN2dLWxaYpS6',
        type: 'HorizontalLayout',
        elements: [],
      },
      {
        key: 'JqgXfhNwWlKkq8N8',
        type: 'Control',
        label: '',
        scope: '#/properties/JqgXfhNwWlKkq8N8',
      },
    ],
  };
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
    let uiSchemaControlPath = findPath(uiSchema, 'key', keyOfElementBefore);
    uiSchemaControlPath = uiSchemaControlPath?.replace('/key', '');
    uiSchemaControlPath = uiSchemaControlPath?.replace('/', '');

    const newUISchema = addPropertyByPath(
      uiSchema,
      uiSchemaControlPath!,
      element?.uiSchema,
      keyOfElementBefore,
      position
    );

    setUISchema(newUISchema);
    if (element.dataSchema) {
      let dataSchemaControlPath = findPath(
        dataSchema,
        'key',
        keyOfElementBefore
      );
      dataSchemaControlPath = dataSchemaControlPath?.replace(
        `/${keyOfElementBefore}/key`,
        ''
      );
      dataSchemaControlPath = dataSchemaControlPath?.replace('/', '');

      const newDataSchema = addPropertyByPath(
        dataSchema,
        dataSchemaControlPath!,
        element?.dataSchema!,
        keyOfElementBefore,
        position
      );

      setDataSchema(newDataSchema);
    }
  };

  const addElementInLayout = (
    element: FormElementInstance,
    layoutKey: string
  ) => {
    let uiSchemaLayoutPath = findPath(uiSchema, 'key', layoutKey);
    uiSchemaLayoutPath = uiSchemaLayoutPath?.replace('/key', '');
    uiSchemaLayoutPath = uiSchemaLayoutPath?.replace('/', '');

    const newUISchema = UpdateUiElementByKey(
      layoutKey,
      uiSchema!,
      element
    );
  
    setUISchema(newUISchema);
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

  return (
    <DesignerContext.Provider
      value={{
        dataSchema,
        uiSchema,
        addElementInLayout,
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
