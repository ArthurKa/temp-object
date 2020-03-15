[![All dependencies](https://img.shields.io/librariesio/release/npm/temp-object/1.0.0?style=flat-square "All dependencies of temp-object@1.0.0")](https://libraries.io/npm/temp-object/1.0.0)
[![Reported vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/temp-object@1.0.0?style=flat-square "Reported vulnerabilities of temp-object@1.0.0")](https://snyk.io/test/npm/temp-object/1.0.0)
[![NPM-version](https://img.shields.io/badge/npm-v1.0.0-blue.svg?style=flat-square&&logo=npm "Current NPM-version")](https://www.npmjs.com/package/temp-object/v/1.0.0)
[![Install size](https://flat.badgen.net/packagephobia/install/temp-object@1.0.0?label=size 'Install size of temp-object@1.0.0')](https://packagephobia.now.sh/result?p=temp-object@1.0.0)
[![Total downloads](https://img.shields.io/npm/dt/temp-object?style=flat-square "Total downloads for all the time")](https://npm-stat.com/charts.html?package=temp-object)

# temp-object@1.0.0

Helps you to autoclean **unused** (only) values from object in amount of time.

## Installation
`temp-object` is available via npm:
``` bash
$ npm i temp-object@1.0.0
```

## Usage
### Synopsis
| Parameter | Type   | Name           | Required | Default value      | Description                    |
|-----------|--------|----------------|----------|--------------------|--------------------------------|
| 1st       | number | TTL            | false    | `86400000` (1 day) | Time to live (in milliseconds) |
| 2nd       | object | Initial object | false    | `{}`               | Object with initial properties |

### Example
``` js
const TempObject = require('temp-object');

const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const obj = new TempObject(1000, { firstKey: 1 });  // TTL 1s
  obj.secondKey = 2;
  console.log(obj);             // { firstKey: 1, secondKey: 2 }
  for(let i = 0; i < 3; i++) {
    await wait(800);
    console.log(obj.firstKey);  // Three times: 1
  }
  console.log(obj);             // { firstKey: 1 }  // Time expired for secondKey
  await wait(1000);
  console.log(obj.firstKey);    // undefined
  console.log(obj);             // {}
})();
```

## Testing
No testing functionality provided.

---

Your improve suggestions and bug reports are welcome any time.
