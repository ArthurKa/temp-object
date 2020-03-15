'use strict';

const pkg = require('./package.json');

function TempObject(ttl = 24 * 60 * 60 * 1000, { ...obj } = {}) {
  if(!new.target) {
    throw new Error(`${pkg.name} cannot be invoked without "new" operator`);
  }

  let expiry;

  function setTimer(key) {
    if(expiry) {
      clearTimeout(expiry[key]);
    }
    return setTimeout(() => {
      delete obj[key];
      delete expiry[key];
    }, ttl);
  }

  expiry = Object.keys(obj).reduce((obj, key) => {
    obj[key] = setTimer(key);
    return obj;
  }, {});

  return new Proxy(obj, {
    get(target, key) {
      if(Object.keys(target).includes(key)) {
        expiry[key] = setTimer(key);
      }
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      expiry[key] = setTimer(key);
    },
  });
}

module.exports = TempObject;
