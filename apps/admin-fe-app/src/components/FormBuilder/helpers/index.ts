import {
  DataSchema,
  FormElementInstance,
  SchemaProperty,
  SchemaPropertyBody,
  UISchema,
} from '../types';

export function findPropertyFromScope(
  scope: string,
  dataSchema: DataSchema
): SchemaPropertyBody | null {
  const s = scope.split('/');
  const first = s.shift();
  if (!first) {
    return dataSchema;
  }
  if (first === '#') {
    return findPropertyFromScope(s.join('/'), dataSchema);
  }
  if (dataSchema.hasOwnProperty(first)) {
    const property = dataSchema[first as keyof DataSchema];
    return findPropertyFromScope(s.join('/'), property as any);
  }
  return null;
}

export function findUiElementByKey(
  key: string,
  uiSchema: UISchema
): Partial<UISchema> | null {
  if (!key) return null;

  if (uiSchema.hasOwnProperty('key')) {
    if (uiSchema['key'] === key) {
      return uiSchema;
    } else {
      if (uiSchema['elements'] && uiSchema['elements'].length) {
        for (const element of uiSchema['elements']) {
          return findUiElementByKey(key, element);
        }
      }
    }
  }
  return null;
}

export function UpdateUiElementByKey(
  key: string,
  uiSchema: UISchema,
  element: FormElementInstance
): UISchema {
  if (!key) return uiSchema;

  if (uiSchema.hasOwnProperty('key')) {
    if (uiSchema['key'] === key) {
      uiSchema.elements?.push(element.uiSchema);
      return uiSchema;
    } else {
      if (uiSchema['elements'] && uiSchema['elements'].length) {
        for (const schemaElement of uiSchema['elements']) {
          UpdateUiElementByKey(key, schemaElement, element);
        }
      }
    }
  }
  return uiSchema;
}

export function removeElementByKey(
  key: string,
  uiSchema: UISchema,
  dataSchema: DataSchema
): { uiSchema: UISchema; dataSchema: DataSchema } | null {
  if (!key) return null;

  return null;
}

export function findPath(
  obj: any,
  name: string,
  val: string,
  currentPath?: string
): string | undefined {
  currentPath = currentPath || '';

  let matchingPath;

  if (!obj || typeof obj !== 'object') return;

  if (obj[name] === val) return `${currentPath}/${name}`;

  for (const key of Object.keys(obj)) {
    if (key === name && obj[key] === val) {
      matchingPath = currentPath;
    } else {
      matchingPath = findPath(obj[key], name, val, `${currentPath}/${key}`);
    }

    if (matchingPath) break;
  }

  return matchingPath;
}

export function removePropertyByName(obj: any, key: string) {
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (i == key) {
      delete obj[key];
    } else if (typeof obj[i] == 'object') {
      removePropertyByName(obj[i], key);
    }
  }
  return obj;
}

export function removePropertyByPath(obj: any, path: string, isRoot = true) {
  if (isRoot) {
    // remove entire root object
    if (obj.hasOwnProperty(path)) {
      return {};
    }
  }
  const p = path.split('/');
  const first = p.shift();
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (i == first) {
      if (p.length === 0) {
        if (parseInt(first) !== NaN && Array.isArray(obj)) {
          obj.splice(+first, 1);
        } else {
          delete obj[first];
        }
      } else if (typeof obj[i] == 'object') {
        removePropertyByPath(obj[i], p.join('/'), false);
      }
    }
  }
  return obj;
}

export function addPropertyByPath(
  obj: any,
  parentPath: string,
  element: SchemaProperty | UISchema,
  keyOfElementBefore: string,
  position: 'before' | 'after',
  isRoot = true
) {
  if (isRoot) {
    if (!parentPath) {
      if (obj.hasOwnProperty('properties')) {
        obj['properties'] = { ...obj['properties'], ...element };
        return obj;
      }
      if (obj.hasOwnProperty('elements')) {
        obj['elements'] = [...obj['elements'], element];
        return obj;
      }
    }
    //  root object
    if (obj.hasOwnProperty(parentPath)) {
      if (Array.isArray(obj)) {
        addElementInPosition(element, keyOfElementBefore, obj, position);
      } else {
        obj[parentPath] = { ...obj[parentPath], ...element };
      }
      return obj;
    }
  }
  const p = parentPath.split('/');
  const first = p.shift();
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (i == first) {
      if (p.length === 0) {
        if (parseInt(first) !== NaN && Array.isArray(obj)) {
          addElementInPosition(element, keyOfElementBefore, obj, position);
        } else {
          obj[first] = { ...obj[first], ...element };
        }
      } else if (typeof obj[i] == 'object') {
        addPropertyByPath(
          obj[i],
          p.join('/'),
          element,
          keyOfElementBefore,
          position,
          false
        );
      }
    }
  }
  return obj;
}

export function addElementInPosition(
  element: SchemaProperty | UISchema,
  adjacentElementKey: string,
  parentElement: any[],
  position: 'before' | 'after'
) {
  const pIndex = parentElement.findIndex((x) => x.key === adjacentElementKey);
  if (position === 'before') {
    parentElement.splice(pIndex, 0, element);
  }
  if (position === 'after') {
    parentElement.splice(pIndex + 1, 0, element);
  }
}

export function addElementInLayoutByPath(
  obj: any,
  layoutPath: string,
  element: SchemaProperty | UISchema,
  layoutKey: string,
  isRoot = true
) {
  console.log('🚀 ~ file: index.ts:199 ~ layoutPath:', layoutPath);
  console.log('🚀 ~ file: index.ts:199 ~ obj:', obj);
  if (isRoot) {
    if (!layoutPath) {
      if (obj.hasOwnProperty('properties')) {
        obj['properties'] = { ...obj['properties'], ...element };
        return obj;
      }
      if (obj.hasOwnProperty('elements')) {
        obj['elements'] = [...obj['elements'], element];
        return obj;
      }
    }
    //  root object
    if (obj.hasOwnProperty(layoutPath)) {
      if (Array.isArray(obj)) {
        obj = [...obj, element];
      } else {
        obj[layoutPath] = { ...obj[layoutPath], ...element };
      }
      return obj;
    }
  }
  const p = layoutPath.split('/');
  const first = p.shift();
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (i == first) {
      if (p.length === 0) {
        if (parseInt(first) !== NaN && Array.isArray(obj)) {
          obj = [...obj, element];
        } else {
          obj[first] = { ...obj[first], ...element };
        }
      } else if (typeof obj[i] == 'object') {
        addElementInLayoutByPath(
          obj[i],
          p.join('/'),
          element,
          layoutKey,
          false
        );
      }
    }
  }
  return obj;
}
