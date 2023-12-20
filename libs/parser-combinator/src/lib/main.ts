// terminal parsers
export function succeed(val: any) {
  return (input: string) => {
    return {
      rest: input,
      value: val,
    };
  };
}

export function failure() {
  return (input: string) => {
    return {
      rest: input,
    };
  };
}

export function match(pattern: string) {
  const success = succeed(pattern);
  const fail = failure();
  return (str: string) => {
    if (pattern.length > str.length) {
      return fail(str);
    }
    const testString = str.slice(0, pattern.length);
    if (testString === pattern) {
      return success(str.slice(pattern.length, str.length));
    }
    return fail(str);
  };
}

// combinator

export function alt(a: any, b: any) {
  return memoize(altMemo(a, b));
}
export function seq(a: any, b: any) {
  return bind(a, (x: any) => {
    return bind(b, (y: any) => {
      return succeed(x + y);
    });
  });
}

function altMemo(a: any, b: any) {
  return memoize((str: string) => {
    let result = a(str);
    if (result.hasOwnProperty('value')) return result;
    return b(str);
  });
}
export function bind(p: any, fn: Function) {
  return (str: string) => {
    const fail = failure();
    let result = p(str);
    if (result.hasOwnProperty('value')) {
      let newParser = fn(result.value);
      return newParser(result.rest);
    }
    return fail(str);
  };
}

function memoize(fn: Function) {
  const cache = new Map();
  const cached = function (this: any, val: any) {
    return cache.has(val)
      ? cache.get(val)
      : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
}
