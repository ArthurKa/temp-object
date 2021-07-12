<header>

Helps you to automatically clean **unused** (only) values from JavaScript object in amount of time.

<installation>

## Usage
### Synopsis
| Parameter | Type   | Name           | Required | Default value      | Description
|-----------|--------|----------------|----------|--------------------|-
| 1st       | number | TTL            | false    | `86400000` (1 day) | Time to live (in milliseconds)
| 2nd       | object | Initial object | false    | `{}`               | Object with **own** initial properties

### Example
```ts
import TempObject from './temp-object/src';

const wait = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

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

<noTesting>

<suggestions>
