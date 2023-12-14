import { DataSchema, UISchema } from '../types';

export function findPropertyFromScope(
  scope: string,
  dataSchema: DataSchema
): Partial<DataSchema> | null {
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
  path: string,
  element: DataSchema | UISchema,
  isRoot = true
) {
  if (isRoot) {
    //  root object
    if (obj.hasOwnProperty(path)) {
      Array.isArray(obj) ? obj.push(element) : (obj[path] = element);
      return obj;
    }
  }
  const p = path.split('/');
  const first = p.shift();
  for (var i in obj) {
    console.log(obj);

    if (!obj.hasOwnProperty(i)) continue;
    if (i == first) {
      if (p.length === 0) {
        if (parseInt(first) !== NaN && Array.isArray(obj)) {
          obj.push(element);
        } else {
          obj[first] = element;
        }
      } else if (typeof obj[i] == 'object') {
        addPropertyByPath(obj[i], p.join('/'), element, false);
      }
    }
  }
  return obj;
}
