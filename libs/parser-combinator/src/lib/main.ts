// terminal parsers
export function succeed() {
  return memoize((val: any) => {
    return memoizeCPS((input: string, cont: Function) => {
      return cont({
        rest: input,
        value: val,
      });
    });
  });
}

export function failure() {
  return (input: string) => {
    return {
      rest: input,
    };
  };
}

export function match() {
  return memoize((pattern: string) => {
    return memoizeCPS((str: string, cont: Function) => {
      if (pattern.length > str.length) {
        return cont({
          rest: str,
        });
      }
      const testString = str.slice(0, pattern.length);
      if (testString === pattern) {
        return cont({
          rest: str.slice(pattern.length, str.length),
          value: pattern,
        });
      } else {
        return cont({
          rest: str,
        });
      }
    });
  });
}

// combinator

// export function alt(a: any, b: any) {
//   return memoize(altMemo(a, b));
// }

export function alt() {
  return memoize((a: any, b: any) => {
    return memoizeCPS((str: string, cont: Function) => {
      a(str, cont);
      b(str, cont);
    });
  });
}
export function seq() {
  const success = succeed();
  return memoize((a: any, b: any) => {
    return memoizeCPS(
      bind(a, (x: any) => {
         return bind(b, (y: any) => {
           return success(x + y);
        });
      })
    );
  });
}

// function altMemo(a: any, b: any) {
//   return memoize((str: string) => {
//     let result = a(str);
//     if (result.hasOwnProperty('value')) return result;
//     return b(str);
//   });
// }
export function bind(p: any, fn: Function) {
  return (str: string, cont: Function) => {
    p(str, (result: any) => {
      if (result.hasOwnProperty('value')) {
        fn(result.value)(result.rest, cont)
      } else {
        cont(result)
      }
    });
  };
}

// function memoize(fn: Function) {
//   const cache = new Map<any[], any>();
//   return function (...args: any[]) {
//     if (cache.has([...args])) {
//       return cache.get([...args]);
//     }
//     //@ts-ignore
//     const result = fn.call(this, ...args);
//     cache.set([...args], result);
//     return result;
//   };
// }
const memoize = (fn: (...args: any[]) => any) => {
  const alist: { args: any[]; result: any }[] = [];

  return (...args: any[]) => {
    const entry = alist.find(
      (entry) => JSON.stringify(entry.args) === JSON.stringify(args)
    );
    if (entry) {
      return entry.result;
    } else {
      const result = fn(...args);
      alist.push({ args, result });
      return result;
    }
  };
};

type entry = { continuations: any[]; results: any[] };
function memoizeCPS(fn: Function) {
  const cache = new Map<string, entry>();
  const pushCont = (entry: entry, cont: Function) => {
    entry.continuations.push(cont);
    return entry;
  };
  const pushResult = (entry: entry, result: any) => {
    entry.results.push(result);
    return entry;
  };
  const resultSubsumed = (entry: entry, result: any) => {
    return entry.results.includes(result);
  };
  function makeEntry() {
    return {
      continuations: [],
      results: [],
    };
  }
  function tableRef(str: string) {
    const entry = cache.get(str);
    if (entry) {
      return entry;
    } else {
      const newEntry = makeEntry();
      cache.set(str, newEntry);
      return newEntry;
    }
  }
  return function (args: string, cont: Function) {
    let entry = tableRef(args);
    // first time memoized procedure has been called with str
    if (entry.continuations.length === 0 && entry.results.length === 0) {
      entry = pushCont(entry, cont);
      fn(args, (result: any) => {
        if (!resultSubsumed(entry, result)) {
          pushResult(entry, result);
          for (let index = 0; index < entry.continuations.length; index++) {
            const innerCont = entry.continuations[index];
            innerCont(result);
          }
        }
        
      });
    } else {
      // second time memoized procedure has been called with str
      entry = pushCont(entry, cont);
      for (let index = 0; index < entry.results.length; index++) {
        const innerResult = entry.results[index];
        cont(innerResult);
      }
    }
  };
}

