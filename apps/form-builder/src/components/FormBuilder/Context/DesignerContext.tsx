import { createContext, ReactNode, useState } from 'react';
import { FormElementInstance } from '../types';
import {
  addPropertyByPath,
  findPath,
  removePropertyByPath,
  updateElementProperties,
  UpdateUiElementByKey,
} from '../helpers';
import {
  ControlEffect,
  DataSchema,
  Rule,
  SchemaPrimitiveType,
  UISchema,
} from '@engine/shared-types';

type DesignerContextType = {
  dataSchema: DataSchema;
  uiSchema?: UISchema;
  elementsMap: Map<string, string>;
  addElementSchemas: (element: FormElementInstance) => void;
  removeElement: (key: string) => void;
  removeLayout: (key: string) => void;
  addElementInPosition: (
    element: FormElementInstance,
    keyOfElementBefore: string,
    position: 'before' | 'after'
  ) => void;
  addElementInLayout: (element: FormElementInstance, layoutKey: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<FormElementInstance | null>
  >;
  updateElementSchemas: (element: FormElementInstance) => void;
  elementsToWatch: Map<
    string,
    {
      rule: Rule;
      dependableElementName: string;
    }
  >;
  uiElementsState: Map<string, ControlEffect>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const baseDataSchema = {
    $schema: '',
    title: 'Form',
    description: 'New Form DataSchema',
    type: 'object' as SchemaPrimitiveType,
    properties: {},
  };
  const [dataSchema, setDataSchema] = useState<DataSchema>(baseDataSchema);
  const [uiSchema, setUISchema] = useState<UISchema | undefined>();
  // maps element key => element name
  const [elementsMap, setElementsMap] = useState<Map<string, string>>(
    new Map()
  );
  const elementsToWatch: Map<
    string,
    {
      rule: Rule;
      dependableElementName: string;
    }
  > = new Map();
  const uiElementsState: Map<string, ControlEffect> = new Map();
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const removeElement = (key: string) => {
    setElementsMap((prev) => {
      prev?.delete(key);
      return new Map(prev);
    });
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
    setElementsMap((prev) => {
      prev?.delete(key);
      return new Map(prev);
    });
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
    if (uiSchema === undefined && element.type === 'Input') {
      alert('You Cant add an input outside of a layout ');
      return;
    }
    if (uiSchema === undefined) {
      setUISchema(element.uiSchema);
    }
    if (uiSchema !== undefined && Object.keys(uiSchema).length) {
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
    if (element.type === 'Input') {
      setElementsMap(
        new Map(elementsMap.set(element.key, element.uiSchema.name))
      );
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
    if (element.type === 'Input') {
      setElementsMap(
        new Map(elementsMap.set(element.key, element.uiSchema.name))
      );
    }
  };

  const addElementInLayout = (
    element: FormElementInstance,
    layoutKey: string
  ) => {
    let uiSchemaLayoutPath = findPath(uiSchema, 'key', layoutKey);
    uiSchemaLayoutPath = uiSchemaLayoutPath?.replace('/key', '');
    uiSchemaLayoutPath = uiSchemaLayoutPath?.replace('/', '');

    const newUISchema = UpdateUiElementByKey(layoutKey, uiSchema!, element);

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
    if (element.type === 'Input') {
      setElementsMap(
        new Map(elementsMap.set(element.key, element.uiSchema.name))
      );
    }
  };

  const updateElementSchemas = (element: FormElementInstance) => {
    let uiSchemaLayoutPath = findPath(uiSchema, 'key', element.key);
    uiSchemaLayoutPath = uiSchemaLayoutPath?.replace('/key', '');
    uiSchemaLayoutPath = uiSchemaLayoutPath?.replace('/', '');

    let dataSchemaControlPath = findPath(dataSchema, 'key', element.key);
    dataSchemaControlPath = dataSchemaControlPath?.replace('/key', '');
    dataSchemaControlPath = dataSchemaControlPath?.replace('/', '');

    const newUISchema = updateElementProperties(
      uiSchema,
      uiSchemaLayoutPath!,
      element.uiSchema
    );
    const newDataSchema = updateElementProperties(
      dataSchema,
      dataSchemaControlPath!,
      element.dataSchema
    );

    setUISchema(newUISchema);
    setDataSchema(newDataSchema);
    setSelectedElement(element);
    if (element.type === 'Input') {
      setElementsMap(
        new Map(elementsMap.set(element.key, element.uiSchema.name))
      );
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
        selectedElement,
        setSelectedElement,
        updateElementSchemas,
        elementsMap,
        elementsToWatch,
        uiElementsState,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
