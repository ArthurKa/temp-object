<header>

Helps you to automatically clean **unused** (only) values from object in amount of time.

<installation>

## Usage
### Synopsis
| Parameter | Type   | Name           | Required | Default value      | Description                    |
|-----------|--------|----------------|----------|--------------------|--------------------------------|
| 1st       | number | TTL            | false    | `86400000` (1 day) | Time to live (in milliseconds) |
| 2nd       | object | Initial object | false    | `{}`               | Object with initial properties |

### Example
``` js
const TempObject = require('.');

const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const obj = new TempObject(1000, { firstKey: 1 });  // TTL 1 second
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

<noTesting>

<suggestions>
