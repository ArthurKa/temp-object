[![All dependencies](https://img.shields.io/librariesio/release/npm/temp-object/1.1.1?style=flat-square "All dependencies of temp-object@1.1.1")](https://libraries.io/npm/temp-object/1.1.1)
[![Reported vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/temp-object@1.1.1?style=flat-square "Reported vulnerabilities of temp-object@1.1.1")](https://snyk.io/test/npm/temp-object/1.1.1)
[![Commits](https://flat.badgen.net/github/commits/ArthurKa/temp-object)](https://github.com/ArthurKa/temp-object/commits/master)
[![NPM-version](https://img.shields.io/badge/npm-v1.1.1-blue.svg?style=flat-square&&logo=npm "Current NPM-version")](https://www.npmjs.com/package/temp-object/v/1.1.1)
[![Total downloads](https://img.shields.io/npm/dt/temp-object?style=flat-square "Total downloads for all the time")](https://npm-stat.com/charts.html?package=temp-object)
[![Developed by](https://img.shields.io/badge/developed_by-ArthurKa-blueviolet.svg?style=flat-square "Have any questions? You are always welcome.")](https://github.com/ArthurKa/temp-object/issues)\
[![Publish size](https://flat.badgen.net/packagephobia/publish/temp-object@1.1.1?label=publish 'Publish size of temp-object@1.1.1')](https://packagephobia.now.sh/result?p=temp-object@1.1.1)
[![Install size](https://flat.badgen.net/packagephobia/install/temp-object@1.1.1?label=install 'Install size of temp-object@1.1.1')](https://packagephobia.now.sh/result?p=temp-object@1.1.1)
[![Minified size](https://img.shields.io/bundlephobia/min/temp-object@1.1.1?style=flat-square&label=minified "Minified size of temp-object@1.1.1")](https://bundlephobia.com/result?p=temp-object@1.1.1)
[![Minified + gzipped size](https://img.shields.io/bundlephobia/minzip/temp-object@1.1.1?style=flat-square&label=minzipped "Minified + gzipped size of temp-object@1.1.1")](https://bundlephobia.com/result?p=temp-object@1.1.1)

# temp-object@1.1.1

Helps you to automatically clean **unused** (only) values from JavaScript object in amount of time.

## Installation
`temp-object` is available via npm:
```bash
$ npm i temp-object@1.1.1
```

## Usage
### Synopsis
| Parameter | Type   | Name           | Required | Default value      | Description
|-----------|--------|----------------|----------|--------------------|-
| 1st       | number | TTL            | false    | `86400000` (1 day) | Time to live (in milliseconds)
| 2nd       | object | Initial object | false    | `{}`               | Object with **own** initial properties

### Example
```ts
import TempObject from 'temp-object';

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

interface MyObj {
  firstKey: number;
  secondKey: number;
}

(async () => {
  const obj = new TempObject(1000, { firstKey: 1 } as MyObj);  // TTL 1 second
  obj.secondKey = 2;
  console.log(obj);             // { firstKey: 1, secondKey: 2 }

  for(let i = 0; i < 3; i++) {
    await wait(800);
    console.log(obj.firstKey);  // Three times: 1
  }
  console.log(obj);             // { firstKey: 1 }  // `secondKey` was expired

  await wait(1000);
  console.log(obj.firstKey);    // undefined
  console.log(obj);             // {}
})();
```

## Testing
Manually tested by developer. Automated tests are not provided.

---

Your improve suggestions and bug reports [are welcome](https://github.com/ArthurKa/temp-object/issues) any time.
