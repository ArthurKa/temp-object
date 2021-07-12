const TempObject = function<T extends Record<string, any> = Record<string, any>>(ttl = 24 * 60 * 60 * 1000, io?: T): Partial<T> {
  const initialObject = { ...io };
  let expiry: Record<string, NodeJS.Timeout>;

  function setTimer(key: string) {
    if(expiry) {
      const timeout = expiry[key];
      if(timeout) {
        clearTimeout(timeout);
      }
    }
    return setTimeout(() => {
      delete initialObject[key];
      delete expiry[key];
    }, ttl);
  }

  expiry = Object.keys(initialObject).reduce((obj, key) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = setTimer(key);
    return obj;
  }, {} as typeof expiry);

  return new Proxy(initialObject, {
    get(target, key) {
      const k = key as string;
      if(Object.keys(target).includes(k)) {
        expiry[k] = setTimer(k);
      }
      return target[k];
    },
    set(target, key, value) {
      const k = key as string;
      // eslint-disable-next-line no-param-reassign
      target[k] = value;
      expiry[k] = setTimer(k);
      return true;
    },
  }) as T;
} as any as new <T extends Record<string, any> = Record<string, any>>(ttl?: number, initialObject?: T) => Partial<T>;

export default TempObject;
